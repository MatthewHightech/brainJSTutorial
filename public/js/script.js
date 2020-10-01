const net = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [1],
    iterations: 200,
    learningRate: 0.5 // global learning rate, useful when training using streams
  });

net.train(data); 
const input = document.getElementById('name');
const submit = document.getElementById('submit');
const greeting = document.getElementById('greeting'); 
const maleButton = document.getElementById('male-button');
const femaleButton = document.getElementById('female-button');
const printButton = document.getElementById('print-button');

let gender = "Mrs. "; 
let gName = ""; 

// clicks submit button and displays text
submit.addEventListener('click', () => {
    gName = input.value.toLowerCase(); 
    gender = guess(gName); 
    greeting.innerHTML = 'Hello ' + gender + input.value; 
  })

// selects male name
maleButton.addEventListener('click', () => {
  enterData(1); 
});

// selects female name
femaleButton.addEventListener('click', () => {
    enterData(0);
});

// prints data in console
printButton.addEventListener('click', print);

// prints data
function print() {
    console.log(JSON.stringify(data))
} // print

// enters data into array
function enterData(value) {
    data.push({
        input: gName,
        output: value
    }); 
    
} // enterData

// runs the net to guess male or female
function guess(name) {
    const netGuess = net.run(name)[0]; 
    console.log(netGuess); 
    return netGuess > 0.5 ? "Mr. " : "Mrs. "; 
} // guess
/*
// returns the name in an object of it's letters
function getNameObj(name) {
    let nameObj = new Object();
    for (let i = 0; i < 10; i++) {
        let currentLetter = name.charAt(i);
        nameObj[i] = currentLetter; 
        console.log(nameObj[i]); 
    }
    return nameObj;
} // getNameObj
*/

