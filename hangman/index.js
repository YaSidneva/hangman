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




