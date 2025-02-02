/**
 *
 * @param {*} dice the number of dice to roll
 * @param {*} faces the number of of the dice
 * @param {*} dropLowest # of lowest rolls to exclude from the result
 * @param {*} dropHighest # of highest rolls to exclude from the result
 * @param {*} exploding # if true, if max roll, roll again and add to result
 * @returns Returns a pseudorandom dice roll.
 */
export let diceRoll = function (dice=1, faces=6, dropLowest=0, dropHighest=0, exploding=false) {
    let result = 0;
    let rolls = [];

    // roll dice
    for (let i = 0; i < dice; i++){
        let roll = randInt(1, faces + 1);
        rolls.push(roll);

        // exploding dice rule
        if (exploding && roll === faces) {
            dice++;
        }

    }

    // sort rolls
    rolls.sort();

    // console.log('before dropping: ' + rolls.toString());

    // drop lowest
    for (let i = 0; i < dropLowest; i++) {
        rolls.shift();
    }

    // drop highest
    for (let i = 0; i < dropHighest; i++) {
        rolls.pop();
    }

    // add up results
    for (let i = 0; i < rolls.length; i++) {
        result += rolls[i];
    }
    // console.lomodulg(rolls);

    return result;
}

// export let lcg = function (modulus = 2 ** 32, multiplier = 1664525, increment = 1013904223, seed = Date.now()) {
//     return multiplier * seed + increment % modulus;
// }

export let rng = {
    seed: Date.now()
};

/**Initializes the RNG with a seed */
export let init = function (seed) {
    rng.seed = seed;

    // set initial values for random number generators
    xorshiftState.n = rng.seed >>> 0;
}

/**
 * Saves the state of the xorshift. Initially set to an unsigned 32-bit seed.
 */
let xorshiftState = {
    n: rng.seed >>> 0
};

/**
 * Generates a pseudo-random number between [0,1) using a 32-bit xorshift RNG
 * @returns a pseudo-random number between [0,1). If the seed is 0, returns 0.
 */
export let xorshift = function () {
    let n = xorshiftState.n;

    // ensure n is unsigned 32-bit integer
    n >>>= 0;

    // xorshift algorithm (uses magic values)
    n ^= n << 13;
    n >>>= 0; // resets to unsigned 32-bit int
    n ^= n >> 7;
    n >>>= 0; // ^
    n ^= n << 17;
    n >>>= 0; // ^^

    // save the state
    xorshiftState.n = n;

    return normalize(n, 2**32-1);
}

/**
 * Normalizes a value using its maximum value.
 * @param {*} value
 * @returns a normalization of the value between 0 and 1.
 */
export let normalize = function (value, maxValue) {
    return value / maxValue;
}

/**
 * Generates a pseudo-random number between two values.
 * @param {*} min Inclusive minimum value.
 * @param {*} max Exclusive maximum value.
 * @param {*} algorithm Specifies the RNG algorithm. The default is a 32-bit xorshift.
 */
export let randFloat = function (min, max, algorithm = xorshift) {
    return algorithm() * (max - min) + min;
}

/**
 * Generates a pseudo-random integer between two values.
 * @param {*} min Inclusive minimum value.
 * @param {*} max Exclusive maximum value.
 * @param {*} algorithm Specifies the RNG algorithm. The default is a 32-bit xorshift.
 */
export let randInt = function (min, max, algorithm = xorshift) {
    return Math.floor(randFloat(min, max, algorithm));
}

/**
 * DEPRECATED
 * @param {*} min inclusive minimum
 * @param {*} max exclusive maximum
 * @returns Returns a pseudorandom float between inclusive min and exclusive max
 */
export let randomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * DEPRECATED
 * @param {*} min inclusive minimum
 * @param {*} max exclusive maximum
 * @returns Returns a pseudorandom integer between inclusive min and exclusive max
 */
export let randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};