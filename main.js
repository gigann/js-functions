import * as rng from "./rng.js"

rng.init(42);

let stats = [];

for (let i = 0; i < 6; i++){
    stats.push(rng.diceRoll(4, 6, 1));
}

let header1 = document.createElement('h1');
header1.innerHTML = stats.toString();

// header1.innerHTML = rng.randInt(-10, 0).toString();

document.body.appendChild(header1);

// console.log(rng.lcg(2 ** 16 + 1, 75, 74));

