let count = 0; 

let totalRMS = 0;
let totalZCR = 0; 
let totalCenteroid = 0; 

let meanRMS = 0;
let meanZCR = 0; 
let meanCenteroid = 0; 

let testData = Object(); 
let guess; 

// if meyda is not working
if (typeof Meyda === "undefined") {
    alert("Meyda could not be found! Have you included it?");
} // if

//console.log(data[0].input.chroma_stft_mean); 
const net = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [60, 40, 20],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
});

// trains the DATA
net.train(data); 


const d = document.getElementById("p");
d.innerHTML = brain.utilities.toSVG(net);
 
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
    "bufferSize": 512,
    // Different audio features to calculate
    "featureExtractors": [
        "rms",
        //"spectralCentroid",
        //"zcr"
    ], 
    // Calculates data and adds it to features everytime the callback runs (86x/sec)
    "callback": features => {
        //console.log(features.spectralCentroid);
        //piano(features.chroma);
        getAverage(features);  
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

        tallyUp(); 
        runNet(); 
    });
});

let input_rms = 0; 
document.querySelector('#rms').addEventListener('change', function() {
    input_rms = document.getElementById("rms").value;
    runNet(input_rms);
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

//run net
function runNet(rms) {
    testData = {
        "rms_mean": meanRMS,
        //"spectral_centroid_mean": meanCenteroid,
        //"zero_crossing_rate_mean": meanZCR
    };
    guess = net.run(testData); 
    var propValue;
    for(var propName in guess) {
        propValue = guess[propName]

        console.log(propName,propValue);
    }
    /*
     for (let i = 0; i < guess.length; i++) {
        console.log(i + ": " + guess[i]);
     }
     */
}

// helper functions
function getAverage(input) {
    count++; 
    totalRMS += input.rms; 
    /*
    if (count > 5) {
        totalCenteroid += input.spectralCentroid;
    }
    totalZCR += input.zcr;
    */
}

function tallyUp(){
    meanRMS = totalRMS/count; 
    //meanCenteroid = (totalCenteroid/count)*10; 
    //meanZCR = (totalZCR/count)/1000;
    printResults(); 
}

function printResults() {
    console.log("RMS_Mean: " + meanRMS);
    //console.log("ZCR_Mean: " + meanZCR);
    //console.log("SpectralCentroid_Mean: " + meanCenteroid);
}


