const piano = document.querySelector(`.piano`);
const fullScreenButton = document.querySelector(`.fullscreen`);
const btnContainer = document.querySelector(`.btn-container`);
const btnNotes = document.querySelector(`.btn-notes`);
const btnLetters = document.querySelector(`.btn-letters`);
const pianoKey = document.querySelectorAll(`.piano-key`);


const playAudio = (src) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}


const addVisualActivity = (note) => {
    piano.querySelector(`[data-note=${note}]`).classList.add(`piano-key-active`);
    setTimeout(() => {
            piano.querySelector(`[data-note=${note}]`).classList.remove(`piano-key-active`)
        }, 200
    )
}

const soundOfKey = (evt) => {
    evt.preventDefault();
    const note = evt.target.dataset.note;
    if (note) {
        const src = `assets/audio/${note}.mp3`;
        addVisualActivity(note);
        playAudio(src);
    }
}

piano.addEventListener(`click`, (evt) => {
    soundOfKey(evt)
});


const fullScreenMode = (switcher) => {
    switcher ? document.documentElement.requestFullscreen() : document.exitFullscreen();
}


fullScreenButton.addEventListener(`click`, () => {
    window.innerHeight !== screen.height ? fullScreenMode(true) : fullScreenMode(false);
})


const notesToLettersSwitch = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains(`btn-notes`)) {
        evt.target.classList.add(`btn-active`);
        btnLetters.classList.remove(`btn-active`);
        pianoKey.forEach((el) => {
            el.classList.remove(`piano-key-letter`)
        })
    } else {
        evt.target.classList.add(`btn-active`);
        btnNotes.classList.remove(`btn-active`);
        pianoKey.forEach((el) => {
            el.classList.add(`piano-key-letter`)
        })
    }
}


btnContainer.addEventListener(`click`, notesToLettersSwitch);


const keySound = (evt) => {
    switch (evt.code) {
        case 'KeyD':
            playAudio(`assets/audio/c.mp3`);
            addVisualActivity(`c`);
            break;
        case 'KeyF':
            playAudio(`assets/audio/d.mp3`);
            addVisualActivity(`d`);
            break;
        case 'KeyG':
            playAudio(`assets/audio/e.mp3`);
            addVisualActivity(`e`);
            break;
        case 'KeyH':
            playAudio(`assets/audio/f.mp3`);
            addVisualActivity(`f`);
            break;
        case 'KeyJ':
            playAudio(`assets/audio/g.mp3`);
            addVisualActivity(`g`);
            break;
        case 'KeyK':
            playAudio(`assets/audio/a.mp3`);
            addVisualActivity(`a`);
            break;
        case 'KeyL':
            playAudio(`assets/audio/b.mp3`);
            addVisualActivity(`b`);
            break;
        case 'KeyR':
            playAudio(`assets/audio/c♯.mp3`);
            addVisualActivity(`c♯`);
            break;
        case 'KeyT':
            playAudio(`assets/audio/d♯.mp3`);
            addVisualActivity(`d♯`);
            break;
        case 'KeyU':
            playAudio(`assets/audio/f♯.mp3`);
            addVisualActivity(`f♯`);
            break;
        case 'KeyI':
            playAudio(`assets/audio/g♯.mp3`);
            addVisualActivity(`g♯`);
            break;
        case 'KeyO':
            playAudio(`assets/audio/a♯.mp3`);
            addVisualActivity(`a♯`);
            break;
    }
}

document.addEventListener(`keydown`, keySound);


let mouseClick = false;

piano.addEventListener(`mousedown`, (evt) => {
    if (evt.target.classList.contains(`piano-key`)) {
        mouseClick = true;
    }
})

document.addEventListener(`mouseup`, () => {
    mouseClick = false;
})


piano.addEventListener(`mouseover`, (evt) => {
    if (evt.which === 1 && mouseClick) {
        soundOfKey(evt);
    }
})


