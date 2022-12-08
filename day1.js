var fs = require('fs');
var filename = 'puzzle1.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const numbers = data.split('\r\n');
    let max = [0];
    let sorted = [];
    let tmp = 0;
    numbers.forEach((number, i) => {
        if (number != '') {
            tmp+=Number(number);
        } else {
            if (tmp >= max[max.length-1]) {
                console.log(max[max.length-1]);
                console.log(tmp);
                max.push(tmp);
            }
            sorted.push(tmp);
            tmp = 0;
        }
    });
    console.log(max);
    console.log(max[max.length-1] + max[max.length-2] + max[max.length-3])
    sorted = sorted.sort((a, b) => b-a);
    console.log(sorted);
    console.log(sorted[0] + sorted[1] + sorted[2])
});