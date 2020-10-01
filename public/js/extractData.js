let data = new Array();

for(let i = 0; i<1000; i++) {
    data.push({
        input: songData[i], 
        output: songLabels[i].label
    });
}

document.getElementById("p").innerHTML = JSON.stringify(data); 