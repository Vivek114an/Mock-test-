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
    document.getElementById('insertBtn').classList.add('hidden');
    document.getElementById('startTestBtn').classList.add('hidden');
    document.getElementById('showResultsBtn').classList.add('hidden');

    // Show the selected page
    if (pageNum === 1) {
        document.getElementById('page1').classList.remove('hidden');
        document.getElementById('insertBtn').classList.remove('hidden');
    } else if (pageNum === 2) {
        document.getElementById('page2').classList.remove('hidden');
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
            text: questionText || 'Question ' + (questions.length + 1),
            image: URL.createObjectURL(questionImages[i]),
            rating: null // Rating is initially not set
        };
        questions.push(question);
    }

    alert("Questions saved!");
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
        img.src = URL.create
