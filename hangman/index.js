// create main container
const body = document.querySelector("body");
const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

// create 2 parts of page
const hangmanImg = document.createElement('div');
hangmanImg.classList.add('hangman-img');
const textPart = document.createElement('div');
textPart.classList.add('text-part');
container.appendChild(hangmanImg);
container.appendChild(textPart);


// create gallow of hangmanImg
const gallow = document.createElement('div');
gallow.classList.add('gallow');
hangmanImg.appendChild(gallow);

//create man on gallow
const manContainer = document.createElement('div');
manContainer.classList.add('man-container');
gallow.appendChild(manContainer);

//create every element of man
function createMan(incorrectGuessesCount) {
    const headMan = document.createElement('img');
    headMan.src = 'img/head.svg';
    headMan.classList.add('head');
    if (incorrectGuessesCount === 1) {
        manContainer.appendChild(headMan);
    }

    const leftHandMan = document.createElement('img');
    leftHandMan.src = 'img/hand-one.svg';
    leftHandMan.classList.add('left-hand');
    if (incorrectGuessesCount === 3) {
        manContainer.appendChild(leftHandMan);
    }


    const rightHandMan = document.createElement('img');
    rightHandMan.src = 'img/hand-two.svg';
    rightHandMan.classList.add('right-hand');
    if (incorrectGuessesCount === 4) {
        manContainer.appendChild(rightHandMan);
    }

    const bodyMan = document.createElement('img');
    bodyMan.src = 'img/body.svg';
    bodyMan.classList.add('body');
    if (incorrectGuessesCount === 2) {
        manContainer.appendChild(bodyMan);
    }


    const leftLegMan = document.createElement('img');
    leftLegMan.src = 'img/leg-one.svg';
    leftLegMan.classList.add('left-leg');
    if (incorrectGuessesCount === 5) {
        manContainer.appendChild(leftLegMan);
    }

    const rightLegMan = document.createElement('img');
    rightLegMan.src = 'img/leg-two.svg';
    rightLegMan.classList.add('right-leg');
    if (incorrectGuessesCount === 6) {
        manContainer.appendChild(rightLegMan);
    }
}



// create question and keyboard parts of textPart
const questionPart = document.createElement('div');
questionPart.classList.add('question-part');
const keyboardPart = document.createElement('div');
keyboardPart.classList.add('keyboard');
textPart.appendChild(questionPart);
textPart.appendChild(keyboardPart);

document.addEventListener('keyup', (event) => {
    const pressedKey = event.key.toUpperCase();

    if (/^[A-Z]$/.test(pressedKey)) {
        if (!triedLetters.includes(pressedKey)) {
            let button;
            for (let i = 0; i <= rows.length - 1; i++) {
                for (let j = 0; j <= rows[i].length - 1; j++) {
                    if (pressedKey === rows[i][j]) {
                        button = keyboardPart.childNodes[i].childNodes[j];
                    }
                }
            }
            handleKeyPress(pressedKey, button);
        }
    } else if (!event.shiftKey && !event.altKey && !event.metaKey && !event.ctrlKey) {
        alert('Please, use only letters and English keyboard layout.');
    }
});


// virtual keyboard
const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];
function createVirtualKeyboard() {


    rows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'keyboard-row';
        row.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleKeyPress(letter, button));
            rowElement.appendChild(button);
        });

        keyboardPart.appendChild(rowElement);
    });
}
createVirtualKeyboard();

let dialog = document.createElement('dialog');
let dialogContent = document.createElement('div');
dialogContent.classList.add('dialog-window');
dialog.appendChild(dialogContent);
let dialogText = document.createElement('div');
dialogText.innerHTML = "ты лох!";
let dialogButton = document.createElement('button');
dialogButton.classList.add('dialog-button');
dialogButton.innerHTML = "OK";
dialogButton.addEventListener('click', () => {
    resetResualt();
    dialog.close();
});
dialogContent.appendChild(dialogText);
dialogContent.appendChild(dialogButton);
body.appendChild(dialog);

let triedLetters = [];

function handleKeyPress(letter, button) {
    triedLetters.push(letter.toUpperCase());
    button.classList.add('button-pressed');
    button.disabled = true;
    if (currentQuestion.answer.toUpperCase().includes(letter.toUpperCase())) {
        button.classList.add('correct-button');
        for (let i = 0; i <= currentQuestion.answer.length - 1; i++) {
            if (currentQuestion.answer[i].toUpperCase() === letter.toUpperCase()) {
                cardsContainer.childNodes[i].childNodes[0].classList.add('letter-open');
                openedLettersCount += 1;
            }

        }
        if (openedLettersCount === currentQuestion.answer.length) {
            dialogText.innerHTML = 'Congratulations, you have won ! <br />' + 'Correct answer: ' + currentQuestion.answer.toUpperCase() + '<br />To restart the game, click OK.';
            dialog.showModal();

        }
    } else {
        button.classList.add('incorrect-button');
        incorrectGuessesCount += 1;
        createMan(incorrectGuessesCount);
        incorrectGuesses.innerHTML = 'Incorrect guesses: ' + incorrectGuessesCount + ' / 6';
        if (incorrectGuessesCount >= 6) {
            dialogText.innerHTML = 'Sorry, you wasted all your guesses. <br />' + 'Correct answer: ' + currentQuestion.answer.toUpperCase() + '<br />Press OK for another attempt.';
            dialog.showModal();
        }

    }
}


// questionsPart
let questionsAndAnswers = [{
    id: 1, question: 'Where can you find many books?', answer: 'library'
},
{
    id: 2, question: 'Where do planes take off and land?', answer: 'airport'
},
{
    id: 3, question: 'What do you use to cover or decorate a window opening?', answer: 'curtain'
},
{
    id: 4, question: 'What is the opposite of captivity or imprisonment?', answer: 'freedom'
},
{
    id: 5, question: 'What is a trip or voyage, typically for pleasure or adventure?', answer: 'journey'
},
{
    id: 6, question: 'What is the absence of sound or noise?', answer: 'silence'
},
{
    id: 7, question: 'What is the state of the atmosphere at a specific time and place?', answer: 'weather'
},
{
    id: 8, question: 'What is the time of day that follows night and precedes noon?', answer: 'morning'
},
{
    id: 9, question: 'What is a two-wheeled vehicle that is powered by pedaling?', answer: 'bicycle'
},
{
    id: 10, question: 'What is the regard and consideration shown to others?', answer: 'respect'
},
];

let currentQuestion = questionsAndAnswers[Math.round(Math.random() * (questionsAndAnswers.length - 1))];

//guesses
let incorrectGuessesCount = 0;
function renderGuesses() {
    let incorrectGuesses = document.createElement('div');
    incorrectGuesses.classList.add('incorrect-guesses');
    incorrectGuesses.innerHTML = 'Incorrect guesses: ' + incorrectGuessesCount + ' / 6';
    questionPart.appendChild(incorrectGuesses);
    return incorrectGuesses;
}
let incorrectGuesses = renderGuesses();

//opened letters
let openedLettersCount = 0;

//questions
function renderQuestion() {
    let questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionPart.appendChild(questionContainer);
    questionContainer.innerText = (currentQuestion.question);
}
renderQuestion();

//answers
function renderAnswer() {
    let answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');
    questionPart.appendChild(answerContainer);
    //answers cards container
    let cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');
    answerContainer.appendChild(cardsContainer);
    //answers every card with letter
    let letterCount;
    for (let i = 0; i <= currentQuestion.answer.length - 1; i++) {
        let letterContainer = document.createElement('div');
        letterContainer.classList.add('letter-container');
        cardsContainer.appendChild(letterContainer);

        let hiddenLetter = document.createElement('div');
        hiddenLetter.classList.add('hidden-letter');
        hiddenLetter.innerHTML = currentQuestion.answer[i];
        letterContainer.appendChild(hiddenLetter);
    }
    return cardsContainer;
}
let cardsContainer = renderAnswer();

//reset 
function resetResualt() {
    incorrectGuessesCount = 0;
    openedLettersCount = 0;
    triedLetters = [];
    manContainer.innerHTML = '';
    currentQuestion = questionsAndAnswers[Math.round(Math.random() * (questionsAndAnswers.length - 1))];
    questionPart.innerHTML = '';
    incorrectGuesses = renderGuesses();
    renderQuestion();
    cardsContainer = renderAnswer();
    keyboardPart.innerHTML = '';
    createVirtualKeyboard();
}