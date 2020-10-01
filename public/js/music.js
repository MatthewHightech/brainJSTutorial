// if meyda is not working
if (typeof Meyda === "undefined") {
    alert("Meyda could not be found! Have you included it?");
} // if

console.log(data[0].input.chroma_stft_mean); 

// new audio object
const audioContext = new AudioContext();
// Select the Audio Element from the DOM
const htmlAudioElement = document.getElementById("audio");
// Create an "Audio Node" from the Audio Element
const source = audioContext.createMediaElementSource(htmlAudioElement);
// Connect the Audio Node to your speakers.
source.connect(audioContext.destination);

// Create the Meyda Analyzer
const analyzer = Meyda.createMeydaAnalyzer({
    // Pass in the AudioContext so that Meyda knows which AudioContext Box to work with
    "audioContext": audioContext,
    // audio node
    "source": source,
    // how often to check the audio sample (44100/512 = 86 times a sec *average*)
    "bufferSize": 2048,
    // Different audio features to calculate
    "featureExtractors": ["rms", "chroma", "spectralCentroid"], 
    // Calculates data and adds it to features everytime the callback runs (86x/sec)
    "callback": features => {
        console.log(features);
        piano(features.chroma); 
    }
});

// starts analyzer and audio track on button click
document.querySelector('#start').addEventListener('click', function() {
    audioContext.resume().then(() => {
        console.log('Playback started successfully');
        analyzer.start();
        htmlAudioElement.play(); 
    });
});

// stops analyzer and audio track on button click
document.querySelector('#stop').addEventListener('click', function() {
    audioContext.resume().then(() => {
        console.log('Playback stopped successfully');
        analyzer.stop();
        htmlAudioElement.pause(); 
    });
});

function piano(chroma) {
    for(let i = 0; i < chroma.length; i++) {
        let key = document.getElementById(i); 
        if (chroma[i] == 1) {
            key.style.backgroundColor = "green";  
        } else {
            if (key.className == "regular") {
                key.style.backgroundColor = "white";
            } else {
                key.style.backgroundColor = "black";
            }
            
        }
    }
}


