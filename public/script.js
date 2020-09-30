const net = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [2],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
  });

//net.train(data); 
const input = document.getElementById('name');
const submit = document.getElementById('submit');
const greeting = document.getElementById('greeting'); 
const maleButton = document.getElementById('male-button');
const femaleButton = document.getElementById('female-button');
const printButton = document.getElementById('print-button');

const gender = "Mrs. "; 

// clicks submit button and displays text
submit.addEventListener('click', () => {
    greeting.innerHTML = 'Hello ' + gender + input.value; 
  })

// selects male name
maleButton.addEventListener('click', () => {
  enterData("male")
});

// selects female name
femaleButton.addEventListener('click', () => {
    enterData("female")
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
        input: color,
        output: [value]
    })
    
} // enterData


