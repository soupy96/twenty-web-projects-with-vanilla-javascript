const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();

// capture voice
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// write what users speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

// check msg against number
function checkNumber(msg) {
    const num = +msg;

    // check if valid num
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }

    // check num to if its in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    // check num
    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}

// generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// speak result
recognition.addEventListener('result', onSpeak);

// end sr service
recognition.addEventListener('end', () => recognition.start());

// play again button
document.body.addEventListener('click', (e) => {
    if(e.target.id === 'play-again') {
        window.location.reload();
    }
});