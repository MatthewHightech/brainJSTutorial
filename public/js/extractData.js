let data = new Array();
let output = new Array(10); 

output[0] = {"blues": 1}; 
output[1] = {"classical": 1}; 
output[2] = {"country": 1}; 
output[3] = {"disco": 1}; 
output[4] = {"hiphop": 1}; 
output[5] = {"jazz": 1}; 
output[6] = {"metal": 1};  
output[7] = {"pop": 1}; 
output[8] = {"reggae": 1}; 
output[9] = {"rock": 1}; 

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