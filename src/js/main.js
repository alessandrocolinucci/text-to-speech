
// Init SpeechSynth API
const synth = window.speechSynthesis;

// Getting DOM elements ...
const speakButton = document.querySelector('#speak-button');
const voiceSelect = document.querySelector('#voice-select');
const textToSpeak = document.querySelector('#texttospeak');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
const body = document.querySelector('body');

// Init voices array

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.table(voices); 

    // Loop through voices and create option for each one
    voices.forEach(voice => {
        //Create option element
        const option = document.createElement('option');
        //Fill option with voice
        option.textContent = voice.name + '(' + voice.lang + ')';
        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })

    M.FormSelect.init(voiceSelect);
}

getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak

const speak = () => {

    body.style.background = '#141414 url(images/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    // Check if speaking
    if (synth.speaking) {
        console.error('%c Already speaking', '#FF0000; font-weight: bold')
    }

    if (textToSpeak.value !== '') {
        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textToSpeak.value);
        //Speak end
        speakText.onend = () => {
            console.log('%c Done speaking', '#00ff00; font-weight: bold');
            document.body.style.background = '#141414';
        }

        // Speak error
        speakText.onerror = () => {
            console.log('Something went wrong!');
        }

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if (voice.name == selectedVoice) {
                speakText.voice = voice; //Setting speaking voice
            }
        })

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// EVENT LISTENERS

// Initialize Material selects
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

// Text form submit
speakButton.addEventListener('click', e => {
    e.preventDefault();
    speak();
    textToSpeak.blur();
})

// Voice select change
voiceSelect.addEventListener('change', e => speak());