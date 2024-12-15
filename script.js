let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let remainingTime = 2400; // 40 minutes in seconds
let isFullScreen = false;

function showPage(pageNum) {
    // Hide all pages
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.add('hidden');

    // Show the selected page
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
        document.getElementById('insertBtn').classList.remove('hidden');
        document.getElementById('startTestBtn').classList.add('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
        document.getElementById('insertBtn').classList.add('hidden');
        document.getElementById('startTestBtn').classList.add('hidden');
        document.getElementById('showResultsBtn').classList.add('hidden');
        loadMockTest();
        startTimer();
        document.getElementById('navigationButtons').classList.remove('hidden');
    } else if (pageNum === 3) {
        document.getElementById('page3').classList.remove('hidden');
        showResults();
    }
}

function saveQuestions() {
    let questionText = document.getElementById('questionText').value;
    let questionImages = document.getElementById('questionImage').files;

    for (let i = 0; i < questionImages.length; i++) {
        let question = {
            text: questionText,
            image: URL.createObjectURL(questionImages[i]),
            rating: null // Rating is initially not set
        };
        questions.push(question);
    }

    alert("Questions saved!");

    // Clear form for next question
    document.getElementById('questionText').value = '';
    document.getElementById('questionImage').value = '';
    document.getElementById('imagePreviewContainer').innerHTML = '';

    updateQuestionsList();
}

function previewImage() {
    let files = document.getElementById('questionImage').files;
    let previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = ''; // Clear previous preview
    for (let i = 0; i < files.length; i++) {
        let img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        previewContainer.appendChild(img);
    }
}

function updateQuestionsList() {
    let list = document.getElementById('questionsList');
    list.innerHTML = ''; // Clear the list
    questions.forEach((question, index) => {
        let li = document.createElement('li');
        li.textContent = question.text;
        list.appendChild(li);
    });
}

function loadMockTest() {
    let testQuestionsContainer = document.getElementById('testQuestions');
    testQuestionsContainer.innerHTML = '';
    let question = questions[currentQuestionIndex];
    let div = document.createElement('div');
    div.textContent = question.text;
    testQuestionsContainer.appendChild(div);
}

function startTimer() {
    timerInterval = setInterval(() => {
        remainingTime--;
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
        }
    }, 1000);
}

function rateQuestion(rating) {
    let question = questions[currentQuestionIndex];
    question.rating = rating;
    if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadMockTest();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadMockTest();
    }
}

function submitTest() {
    clearInterval(timerInterval);
    showPage(3); // Go to results page
}

function showResults() {
    let okList = document.getElementById('okQuestions');
    let goodList = document.getElementById('goodQuestions');
    let bestList = document.getElementById('bestQuestions');
    
    okList.innerHTML = '';
    goodList.innerHTML = '';
    bestList.innerHTML = '';
    
    questions.forEach((question) => {
        let li = document.createElement('li');
        li.textContent = question.text;
        if (question.rating === 'OK') {
            okList.appendChild(li);
        } else if (question.rating === 'Good') {
            goodList.appendChild(li);
        } else if (question.rating === 'Best') {
            bestList.appendChild(li);
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
}

function toggleFullScreen() {
    if (!isFullScreen) {
        document.documentElement.requestFullscreen();
        isFullScreen = true;
    } else {
        document.exitFullscreen();
        isFullScreen = false;
    }
}
