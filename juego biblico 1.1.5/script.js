const levels = [
    [
        {
            question: "¿Quien se rio de Noe?",
            options: ["Jafet", "Set", "Can", "sem"],
            answer: "Can"
        },
        {
            question: "¿Quien soño con una escalera que subia al cielo?",
            options: ["Isaac", "Ismael", "Jacob", "Esaú"],
            answer: "Jacob"
        },
        {
            question: "¿Como se llamaba el suegro de jacob?",
            options: ["Jetro", "David", "Isai", "Labán"],
            answer: "Labán"
        },
        {
            question: "¿Quien mato a sísara?",
            options: ["Debora", "Rahab", "Jael", "Sara"],
            answer: "Jael"
        },
        {
            question: "¿Cuantos dias ayuno esther con sus concubinas?",
            options: ["4", "8", "3", "5"],
            answer: "3"
        }
    ], 
    [
        {
            question: "¿Cuatro jovenes fueron llevados cautivos a babilonia, alla se les dio un nombre diferente a cada uno a quien se le dio el nombre de sadrac?",
            options: ["Daniel", "Azarias", "Misael", "Ananias"],
            answer: "Can"
        },
        {
            question: "¿Como se llamaba el rey que vio la escritura en la pared?",
            options: ["Nabucopolasar", "Acab", "Dario", "Belsasar"],
            answer: "Belsasar"
        },
        {
            question: "¿Dijo que no lloveria y no llovio?",
            options: ["Eliseo", "Isaias", "Jonas", "Elias"],
            answer: "Elias"
        },
        {
            question: "¿Quien era eunuco?",
            options: ["Jose", "Daniel", "Jeremias", "Pedro"],
            answer: "Daniel"
        }
    ],   
    [
        {
            question: "¿En la corte habia un principe de los eunucos como se llamaba cuando llegaron daniel y sus compañeros?",
            options: ["zofenat", "Mardoqueo", "Aspenaz", "Azpenos"],
            answer: "Aspenaz"
        },
        {
            question: "¿A quien dijo jesus (vuelve tu espada a su lugar porque el que a espada mata a espada muere)?",
            options: ["Juan", "Judas", "Pedro", "Pablo"],
            answer: "Pedror"
        },
        {
            question: "¿Era perseuidor y despues fue perseguido?",
            options: ["´Pedro", "Pablo", "Filemon", "Sabulon"],
            answer: "Pablo" 
        },
        {
            question: "¿Como se llamaba la esposa de moises?",
            options: ["Sefora", "Sara", "Lea", "Debora"],
            answer: "Sefora"
        },
    ],
    [
        {
            question: "¿A quien llamo pablo compañero de viaje?",
            options: ["Apolo", "Arquipo", "Afia", "Felix"],
            answer: "Arquipo"
        },
        {
            question: "¿Como se llamaba el rey de israel que sacrifico en el fuego a su hijo?",
            options: ["Joaz", "Acaz", "Joacaz", "Joacim"],
            answer: "Acaz"
        },
        {
            question: "¿Quienes le dijeron a jesus quieres que mandemos fuego del cielo y los consuma: como lo hizo elias?",
            options: ["Pedro y Juan", "Juan y Jacobo", "Jacobo y Pedro", "Lucas y Pedro"],
            answer: "Juan y Jacobo"
        },
        {
            question: "¿Fue jueza y lider de israel?",
            options: ["Sefora", "Sara", "Lea", "Debora"],
            answer: "Debora"
        },
        {
            question: "¿Quien era el rey de juda cuando nabucodonosor sitio jerusalen?",
            options: ["Davis", "Acaz", "Joas", "Joacim"],
            answer: "Joacim"
        }
    ],
];


let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let countdown;

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const scoreContainer = document.getElementById('score-container');
const timerContainer = document.getElementById('timer-container');
const levelMessageContainer = document.getElementById('level-message-container');
const progressBar = document.getElementById('progress-bar');
const audioPlayer = document.getElementById('audio-player');


// Cargar los sonidos
const correctSound = new Audio('sounds/correct.mp3');
const incorrectSound = new Audio('sounds/incorrect.mp3');
const levelUpSound = new Audio('sounds/levelup.mp3');

function playSound(sound) {
    sound.currentTime = 0; // Reiniciar el sonido
    sound.play();
}

function updateProgressBar() {
    const totalQuestions = levels.reduce((total, level) => total + level.length, 0);
    const answeredQuestions = currentLevel * levels[0].length + currentQuestionIndex + 1;
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function displayQuestion() {
    const questionObj = levels[currentLevel][currentQuestionIndex];
    questionContainer.textContent = questionObj.question;

    optionsContainer.innerHTML = '';
    questionObj.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(optionElement);
    });

    scoreContainer.textContent = 'Puntaje: ' + score;

    if (currentQuestionIndex === 0) {
        levelMessageContainer.textContent = '¡Nivel ' + (currentLevel + 1) + '!';
        levelMessageContainer.classList.add('visible');
        playSound(levelUpSound);
        setTimeout(() => {
            levelMessageContainer.classList.remove('visible');
        }, 2000);
    }
    
    updateProgressBar();
    startTimer();
}

function startTimer() {
    let timeLeft = 30; // Tiempo en segundos
    clearInterval(countdown); // Limpiar cualquier temporizador existente
    updateTimerDisplay(timeLeft); // Actualizar la visualización del temporizador

    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft === 0) {
            clearInterval(countdown);
            resultContainer.textContent = '¡Tiempo agotado!';
            resultContainer.classList.remove('correct', 'incorrect');
            resultContainer.classList.add('time-out');
            checkAnswer(undefined); // Verificar respuesta cuando se agote el tiempo
        }
    }, 1000); // Actualizar el temporizador cada segundo
}

function updateTimerDisplay(timeLeft) {
    timerContainer.textContent = 'Tiempo restante: ' + timeLeft + 's';
}

function checkAnswer(optionIndex) {
    clearInterval(countdown);
    const selectedOption = optionIndex !== undefined ? levels[currentLevel][currentQuestionIndex].options[optionIndex] : undefined;
    const correctAnswer = levels[currentLevel][currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    if (optionIndex === undefined) {
        score--;
    } else if (isCorrect) {
        score++;
        resultContainer.textContent = '¡Respuesta correcta!';
        resultContainer.classList.remove('incorrect', 'time-out');
        resultContainer.classList.add('correct');
        playSound(correctSound);
    } else {
        resultContainer.textContent = '¡Respuesta incorrecta!';
        resultContainer.classList.remove('correct', 'time-out');
        resultContainer.classList.add('incorrect');
        playSound(incorrectSound);
    }

    scoreContainer.textContent = 'Puntaje: ' + score;
    resultContainer.classList.add('visible');

    setTimeout(() => {
        resultContainer.classList.remove('visible');
        if (currentQuestionIndex < levels[currentLevel].length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            if (currentLevel < levels.length - 1) {
                currentLevel++;
                currentQuestionIndex = 0;
                displayQuestion();
            } else {
                questionContainer.textContent = '';
                optionsContainer.textContent = '';
                scoreContainer.textContent = 'Puntaje final: ' + score;
                timerContainer.textContent = '';
            }
        }
    }, 2000);
}

displayQuestion();
