let data = new Array();
let output = new Array(10); 

output[0] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
output[1] = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]; 
output[2] = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]; 
output[3] = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]; 
output[4] = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]; 
output[5] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]; 
output[6] = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; 
output[7] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]; 
output[8] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]; 
output[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]; 

let count = 0; 

for(let i = 0; i<10; i++) {
    for (let j = 0; j<100; j++ ) {
        count++; 
        data.push({
            input: songData[count], 
            output: output[i]
        });
    }
}

document.getElementById("p").innerHTML = JSON.stringify(data); 