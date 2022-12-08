const fs = require('fs');
const filename = 'day8.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    let matrix = [];
    let maxX = 0;
    let maxY = 0;
    lines.forEach(line => {
        let row = [];
        [...line].forEach(tree => row.push(tree));
        matrix.push(row);
        maxX++;
        maxY = line.length;
    })

    part1(matrix, maxX, maxY);
    part2(matrix, maxX, maxY);
});

function part1(matrix, maxX, maxY) {
    let sum = 0;
    matrix.forEach((row, x) => {
        row.forEach((tree, y) => {
            checkIfVisible(x, y, tree, matrix, maxX, maxY) ? sum++ : null;
        })
    });
    console.log(sum);
}

function checkIfVisible(x, y, tree, matrix, maxX, maxY) {
    if (x === 0 || y === 0 || x === maxX-1 || y === maxY-1) {
        // edge case, always vissible
        return true;
    }

    let left = true, top = true, right = true, bottom = true;
    matrix.forEach((row, xx) => {
        row.forEach((tree_, yy) => {
            if (x === xx) {
                if (tree_ >= tree) {
                    if (yy < y) {
                        left = false;
                    } else if (yy > y) {
                        right = false;
                    }
                }
            }
            if (y === yy) {
                if (tree_ >= tree) {
                    if (xx < x) {
                        top = false;
                    } else if (xx > x) {
                        bottom = false;
                    }
                }
            }
        });
    });

    return left || top || right || bottom;
}

function part2(matrix, maxX, maxY) {
    let maxScore = 0;
    matrix.forEach((row, x) => {
        row.forEach((tree, y) => {
            let score = calculateScenicScore(x, y, tree, matrix, maxX, maxY);
            if (score > maxScore) maxScore = score;
        })
    });
    console.log(maxScore);
}

function calculateScenicScore(x, y, tree, matrix, maxX, maxY) {

    let left = 0, top = 0, right = 0, bottom = 0;

    // go left
    for (let yy = y-1; yy >= 0; yy--) {
        left++;
        if (matrix[x][yy] >= tree) {
            break;
        }
    }

    // go up
    for (let xx = x-1; xx >= 0; xx--) {
        top++;
        if (matrix[xx][y] >= tree) {
            break;
        }
    }

    // go right
    for (let yy = y+1; yy < maxY; yy++) {
        right++;
        if (matrix[x][yy] >= tree) {
            break;
        }
    }

    // go down
    for (let xx = x+1; xx < maxX; xx++) {
        bottom++;
        if (matrix[xx][y] >= tree) {
            break;
        }
    }

    return left*top*right*bottom;
}