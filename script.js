// Mood Tracker Functionality
const moodOptions = document.querySelectorAll('.mood-option');
const activitiesContainer = document.getElementById('activities-container');
const activitiesIntro = document.getElementById('activities-intro');

// Wellness activities based on mood
const wellnessActivities = {
    'very-sad': [
        {
            title: 'Reach Out for Support',
            description: 'Talk to a trusted friend, family member, or mental health professional about how you\'re feeling.',
            icon: 'fa-comments'
        },
        {
            title: 'Practice Self-Compassion',
            description: 'Be kind to yourself. Remember that it\'s okay to have difficult days and this feeling will pass.',
            icon: 'fa-heart'
        },
        {
            title: 'Gentle Physical Activity',
            description: 'Try a short walk or gentle stretching to help release tension and boost endorphins.',
            icon: 'fa-walking'
        },
        {
            title: 'Listen to Uplifting Music',
            description: 'Create a playlist of songs that have brought you comfort or joy in the past.',
            icon: 'fa-music'
        }
    ],
    'sad': [
        {
            title: 'Connect with Nature',
            description: 'Spend some time outdoors, even if it\'s just sitting in a park or garden for a few minutes.',
            icon: 'fa-tree'
        },
        {
            title: 'Journal Your Feelings',
            description: 'Write down what you\'re experiencing without judgment to help process your emotions.',
            icon: 'fa-pen'
        },
        {
            title: 'Do Something Creative',
            description: 'Draw, paint, write, or engage in any creative activity that allows you to express yourself.',
            icon: 'fa-palette'
        },
        {
            title: 'Practice Deep Breathing',
            description: 'Take slow, deep breaths to help calm your nervous system and reduce stress.',
            icon: 'fa-wind'
        }
    ],
    'neutral': [
        {
            title: 'Try Something New',
            description: 'Explore a new hobby, recipe, or place to spark some interest and engagement.',
            icon: 'fa-compass'
        },
        {
            title: 'Practice Gratitude',
            description: 'Write down three things you\'re grateful for today to shift your perspective.',
            icon: 'fa-thumbs-up'
        },
        {
            title: 'Connect with Others',
            description: 'Reach out to a friend or family member for a chat or social activity.',
            icon: 'fa-user-friends'
        },
        {
            title: 'Move Your Body',
            description: 'Engage in physical activity that you enjoy, like dancing, walking, or yoga.',
            icon: 'fa-running'
        }
    ],
    'happy': [
        {
            title: 'Share Your Joy',
            description: 'Spread your positive feelings by doing something kind for someone else.',
            icon: 'fa-gift'
        },
        {
            title: 'Savor the Moment',
            description: 'Take time to fully appreciate your happy feelings and what caused them.',
            icon: 'fa-smile'
        },
        {
            title: 'Build on Your Momentum',
            description: 'Channel your positive energy into a project or goal you\'ve been working on.',
            icon: 'fa-rocket'
        },
        {
            title: 'Celebrate Your Accomplishments',
            description: 'Acknowledge what\'s going well and the progress you\'ve made recently.',
            icon: 'fa-trophy'
        }
    ],
    'very-happy': [
        {
            title: 'Capture the Moment',
            description: 'Take a photo or write about your experience to remember this feeling later.',
            icon: 'fa-camera'
        },
        {
            title: 'Express Your Creativity',
            description: 'Use your elevated mood to create something new and inspiring.',
            icon: 'fa-paint-brush'
        },
        {
            title: 'Plan Something Exciting',
            description: 'Use this positive energy to plan a future event or trip to look forward to.',
            icon: 'fa-calendar-alt'
        },
        {
            title: 'Share Your Energy',
            description: 'Your enthusiasm can be contagious - share it with others around you.',
            icon: 'fa-share-alt'
        }
    ]
};

// Function to display activities based on selected mood
function displayActivities(mood) {
    // Clear current activities
    activitiesContainer.innerHTML = '';
    
    // Get activities for the selected mood
    const activities = wellnessActivities[mood];
    
    // Update intro text
    activitiesIntro.textContent = `Based on your current mood, here are some activities that might help:`;
    
    // Create and append each activity
    activities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        const titleElement = document.createElement('h4');
        titleElement.innerHTML = `<i class="fas ${activity.icon}"></i> ${activity.title}`;
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = activity.description;
        
        activityElement.appendChild(titleElement);
        activityElement.appendChild(descriptionElement);
        
        activitiesContainer.appendChild(activityElement);
    });
}

// Add event listeners to mood options
moodOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selected class from all options
        moodOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Display activities for the selected mood
        const selectedMood = this.dataset.mood;
        displayActivities(selectedMood);
    });
});

// Breathing Exercise Functionality
const breathingCircle = document.getElementById('breathing-circle');
const breathingTimer = document.getElementById('breathing-timer');
const breathingInstructions = document.getElementById('breathing-instructions');
const stopBreathingBtn = document.getElementById('stop-breathing');
let breathingInterval;
let isBreathingActive = false;
let currentPhase = 'ready';
let countdown = 0;

// Breathing exercise phases
const phases = [
    { name: 'inhale', duration: 4, text: 'Inhale', nextPhase: 'hold' },
    { name: 'hold', duration: 7, text: 'Hold', nextPhase: 'exhale' },
    { name: 'exhale', duration: 8, text: 'Exhale', nextPhase: 'inhale' }
];

breathingCircle.addEventListener('click', function() {
    if (!isBreathingActive) {
        startBreathingExercise();
    }
});

stopBreathingBtn.addEventListener('click', function() {
    stopBreathingExercise();
});

function startBreathingExercise() {
    isBreathingActive = true;
    currentPhase = 'inhale';
    countdown = phases[0].duration;
    
    breathingInstructions.textContent = 'Follow the circle and timer prompts. Inhale through your nose and exhale through your mouth.';
    stopBreathingBtn.style.display = 'inline-block';
    
    // Start the breathing cycle
    runBreathingPhase();
}

function runBreathingPhase() {
    if (!isBreathingActive) return;
    
    // Find the current phase object
    const phaseObj = phases.find(p => p.name === currentPhase);
    
    // Update circle appearance and text
    breathingCircle.className = 'breathing-circle ' + currentPhase;
    breathingTimer.textContent = countdown;
    
    // Update instructions
    breathingInstructions.textContent = phaseObj.text;
    
    // Countdown timer
    breathingInterval = setInterval(() => {
        countdown--;
        breathingTimer.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(breathingInterval);
            
            // Move to next phase
            currentPhase = phaseObj.nextPhase;
            
            // Find next phase object and reset countdown
            const nextPhaseObj = phases.find(p => p.name === currentPhase);
            countdown = nextPhaseObj.duration;
            
            // Continue with next phase
            setTimeout(runBreathingPhase, 500); // Brief pause between phases
        }
    }, 1000);
}

function stopBreathingExercise() {
    isBreathingActive = false;
    clearInterval(breathingInterval);
    
    // Reset UI
    breathingCircle.className = 'breathing-circle';
    breathingTimer.textContent = 'Ready';
    breathingInstructions.textContent = 'Click the circle to begin the breathing exercise.';
    stopBreathingBtn.style.display = 'none';
    
    // Reset variables
    currentPhase = 'ready';
    countdown = 0;
}

// Mental Health Assessment
const startAssessmentBtn = document.getElementById('start-assessment');
const assessmentQuestions = document.getElementById('assessment-questions');
const assessmentResults = document.getElementById('assessment-results');
const assessmentIntro = document.querySelector('.assessment-intro');

// Assessment questions
const questions = [
    {
        id: 1,
        text: "Little interest or pleasure in doing things?",
        options: [
            { text: "Not at all", value: 0 },
            { text: "Several days", value: 1 },
            { text: "More than half the days", value: 2 },
            { text: "Nearly every day", value: 3 }
        ]
    },
    {
        id: 2,
        text: "Feeling down, depressed, or hopeless?",
        options: [
            { text: "Not at all", value: 0 },
            { text: "Several days", value: 1 },
            { text: "More than half the days", value: 2 },
            { text: "Nearly every day", value: 3 }
        ]
    },
    {
        id: 3,
        text: "Trouble falling or staying asleep, or sleeping too much?",
        options: [
            { text: "Not at all", value: 0 },
            { text: "Several days", value: 1 },
            { text: "More than half the days", value: 2 },
            { text: "Nearly every day", value: 3 }
        ]
    },
    {
        id: 4,
        text: "Feeling tired or having little energy?",
        options: [
            { text: "Not at all", value: 0 },
            { text: "Several days", value: 1 },
            { text: "More than half the days", value: 2 },
            { text: "Nearly every day", value: 3 }
        ]
    },
    {
        id: 5,
        text: "Poor appetite or overeating?",
        options: [
            { text: "Not at all", value: 0 },
            { text: "Several days", value: 1 },
            { text: "More than half the days", value: 2 },
            { text: "Nearly every day", value: 3 }
        ]
    }
];

let currentQuestion = 0;
let answers = [];

// Start assessment button
startAssessmentBtn.addEventListener('click', startAssessment);

function startAssessment() {
    assessmentIntro.style.display = 'none';
    assessmentQuestions.style.display = 'block';
    currentQuestion = 0;
    answers = [];
    displayQuestion();
}

function displayQuestion() {
    // Clear previous question
    assessmentQuestions.innerHTML = '';
    
    // Get current question
    const question = questions[currentQuestion];
    
    // Create question element
    const questionElement = document.createElement('div');
    questionElement.className = 'assessment-question';
    
    const questionText = document.createElement('h4');
    questionText.textContent = `Question ${currentQuestion + 1} of ${questions.length}: ${question.text}`;
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'assessment-options';
    
    // Create options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'assessment-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = `option-${index}`;
        radio.name = `question-${question.id}`;
        radio.value = option.value;
        
        // Check if this answer was previously selected
        if (answers[currentQuestion] !== undefined && answers[currentQuestion] == option.value) {
            radio.checked = true;
        }
        
        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = option.text;
        
        optionElement.appendChild(radio);
        optionElement.appendChild(label);
        optionsContainer.appendChild(optionElement);
    });
    
    questionElement.appendChild(questionText);
    questionElement.appendChild(optionsContainer);
    assessmentQuestions.appendChild(questionElement);
    
    // Create navigation buttons
    const navigation = document.createElement('div');
    navigation.className = 'assessment-navigation';
    
    // Previous button (not shown on first question)
    if (currentQuestion > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn';
        prevBtn.textContent = 'Previous';
        prevBtn.addEventListener('click', previousQuestion);
        navigation.appendChild(prevBtn);
    }
    
    // Next/Submit button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';
    nextBtn.textContent = currentQuestion < questions.length - 1 ? 'Next' : 'Submit';
    nextBtn.addEventListener('click', nextQuestion);
    navigation.appendChild(nextBtn);
    
    assessmentQuestions.appendChild(navigation);
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function nextQuestion() {
    // Get selected answer
    const selectedOption = document.querySelector(`input[name="question-${questions[currentQuestion].id}"]:checked`);
    
    if (!selectedOption) {
        showNotification('Please select an answer before continuing.');
        return;
    }
    
    // Save answer
    answers[currentQuestion] = parseInt(selectedOption.value);
    
    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    assessmentQuestions.style.display = 'none';
    assessmentResults.style.display = 'block';
    
    // Calculate score
    const score = answers.reduce((total, answer) => total + answer, 0);
    
    // Determine severity level
    let severity, severityClass, message, recommendations;
    
    if (score <= 4) {
        severity = "Minimal";
        severityClass = "low";
        message = "Your responses suggest minimal symptoms of depression. Continue to maintain healthy habits and monitor your wellbeing.";
        recommendations = [
            "Continue practicing self-care activities",
            "Stay connected with friends and family",
            "Maintain a balanced diet and regular exercise",
            "Consider checking in with your feelings periodically"
        ];
    } else if (score <= 9) {
        severity = "Mild";
        severityClass = "moderate";
        message = "Your responses suggest mild symptoms of depression. Consider implementing some self-care strategies and monitoring your symptoms.";
        recommendations = [
            "Try the wellness activities suggested based on your mood",
            "Practice relaxation techniques like the breathing exercise",
            "Ensure you're getting enough sleep and eating well",
            "Consider talking to someone you trust about your feelings",
            "Monitor your symptoms and seek help if they worsen"
        ];
    } else if (score <= 14) {
        severity = "Moderate";
        severityClass = "moderate";
        message = "Your responses suggest moderate symptoms of depression. It's recommended to seek support from a healthcare professional.";
        recommendations = [
            "Consider making an appointment with your doctor or a mental health professional",
            "Continue with self-care activities and stress management",
            "Reach out to supportive friends or family members",
            "Try to maintain regular routines for sleep, meals, and exercise",
            "Be patient with yourself as you work through this"
        ];
    } else {
        severity = "Moderately Severe to Severe";
        severityClass = "high";
        message = "Your responses suggest moderately severe to severe symptoms of depression. It's strongly recommended to seek professional help as soon as possible.";
        recommendations = [
            "Contact a healthcare professional immediately",
            "Consider the emergency resources listed on this website",
            "Reach out to someone you trust for support",
            "If you're having thoughts of harming yourself, seek emergency care",
            "Remember that effective treatments are available and you don't have to face this alone"
        ];
    }
    
    // Create results display
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'assessment-results';
    
    const scoreTitle = document.createElement('h3');
    scoreTitle.textContent = 'Your Assessment Results';
    resultsContainer.appendChild(scoreTitle);
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = `score-display ${severityClass}`;
    scoreDisplay.textContent = `${score} out of 15`;
    resultsContainer.appendChild(scoreDisplay);
    
    const severityText = document.createElement('p');
    severityText.innerHTML = `<strong>Severity Level:</strong> ${severity}`;
    resultsContainer.appendChild(severityText);
    
    const resultsMessage = document.createElement('div');
    resultsMessage.className = `results-message ${severityClass}`;
    resultsMessage.textContent = message;
    resultsContainer.appendChild(resultsMessage);
    
    const recommendationsTitle = document.createElement('h4');
    recommendationsTitle.textContent = 'Recommendations:';
    resultsContainer.appendChild(recommendationsTitle);
    
    const recommendationsList = document.createElement('ul');
    recommendationsList.className = 'recommendations';
    
    recommendations.forEach(rec => {
        const item = document.createElement('li');
        item.textContent = rec;
        recommendationsList.appendChild(item);
    });
    
    resultsContainer.appendChild(recommendationsList);
    
    // Add retake button
    const retakeBtn = document.createElement('button');
    retakeBtn.className = 'btn retake-assessment';
    retakeBtn.textContent = 'Retake Assessment';
    retakeBtn.addEventListener('click', () => {
        assessmentResults.style.display = 'none';
        assessmentIntro.style.display = 'block';
    });
    resultsContainer.appendChild(retakeBtn);
    
    // Clear and add results
    assessmentResults.innerHTML = '';
    assessmentResults.appendChild(resultsContainer);
}

// Daily Quotes
const quotes = [
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer, PhD" },
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Mental health is an investment, not an expense.", author: "Unknown" },
    { text: "It's okay to not be okay, as long as you are not giving up.", author: "Unknown" },
    { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
    { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
    { text: "The strongest people are those who win battles we know nothing about.", author: "Unknown" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" }
];

function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('daily-quote').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
}

// Display a random quote on page load
displayRandomQuote();

// Notification Function
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});