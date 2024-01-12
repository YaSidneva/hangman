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


// create question and keyboard parts of textPart
const questionPart = document.createElement('div');
questionPart.classList.add('question-part');
const keyboardPart = document.createElement('div');
keyboardPart.classList.add('keyboard');
textPart.appendChild(questionPart);
textPart.appendChild(keyboardPart);

// virtual keyboard
function createVirtualKeyboard() {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    rows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'keyboard-row';

        row.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => handleKeyPress(letter));
            rowElement.appendChild(button);
        });

        keyboardPart.appendChild(rowElement);
    });
}

createVirtualKeyboard();

// questionsPart
let questionsAndAnswers = [{
    id: 1, question: '11', answer: '111'
},
{
    id: 2, question: '22', answer: '222'
},
{
    id: 3, question: '33', answer: '333'
},
{
    id: 4, question: '44', answer: '444'
},
{
    id: 5, question: '55', answer: '555'
},
{
    id: 6, question: '66', answer: '666'
},
];

let currentQuestion = questionsAndAnswers[Math.round(Math.random() * (questionsAndAnswers.length - 1))];
console.log(currentQuestion);

//guesses
let incorrectGuesses = document.createElement('div');
incorrectGuesses.classList.add('incorrect-guesses');
let incorrectGuessesCount = 0;
incorrectGuesses.innerHTML = 'Incorrect guesses: ' + ' / 6';
questionPart.appendChild(incorrectGuesses);

//questions
let questionContainer = document.createElement('div');
questionContainer.classList.add('question-container');
questionPart.appendChild(questionContainer);
questionContainer.innerText = (currentQuestion.question);


//answers
let answerContainer = document.createElement('div');
answerContainer.classList.add('answer-container');
questionPart.appendChild(answerContainer);
//answers cards container
let cardsContainer = document.createElement('div');
cardsContainer.classList.add('cards-container');
answerContainer.appendChild(cardsContainer);
//answers every card with letter
let letterCount;
console.log(currentQuestion.answer);
console.log(currentQuestion.answer.length);
for (let i = 0; i <= currentQuestion.answer.length - 1; i++) {
    let hiddenLetter = document.createElement('div');
    hiddenLetter.classList.add('hidden-letter');
    hiddenLetter.innerHTML = currentQuestion.answer[i];
    cardsContainer.appendChild(hiddenLetter);
}










