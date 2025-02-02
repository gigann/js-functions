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
        let roll = randomInt(1, faces + 1);
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

export let lcg = function (modulus = 2 ** 32, multiplier = 1664525, increment = 1013904223, seed = Date.now()) {
    return multiplier * seed + increment % modulus;
}


/**
 * Generates a pseudo-random number between [0, 1) using a 32-bit xorshift RNG
 * @param {*number} seed Seeds the RNG. If left blank, uses Date.now().
 * @returns a pseudo-random number between [0, 1). If the seed is 0, returns 0.
 */
export let xorshift = function (seed = Date.now()) {
    let n = seed;

    // ensure n is unsigned 32-bit integer
    n >>>= 0;

    // xorshift algorithm
    n ^= n << 13;
    n >>>= 0;
    n ^= n >> 7;
    n >>>= 0;
    n ^= n << 17;
    n >>>= 0;

    // normalize to [0, 1)
    n /= (2 ** 32 - 1);

    return n;
}

/**
 * Generates a pseudo-random number between two values.
 * @param {*} min Inclusive minimum value.
 * @param {*} max Exclusive maximum value.
 * @param {*} seed Seeds the RNG. If left blank, uses Date.now().
 * @param {*} algorithm Specifies the RNG algorithm. The default is a 32-bit xorshift.
 */
export let rand = function (min, max, seed = Date.now(), algorithm = xorshift) {
    return algorithm(seed) * (max - min) + min;
}

/**
 * Generates a pseudo-random integer between two values.
 * @param {*} min Inclusive minimum value.
 * @param {*} max Exclusive maximum value.
 * @param {*} seed Seeds the RNG. If left blank, uses Date.now().
 * @param {*} algorithm Specifies the RNG algorithm. The default is a 32-bit xorshift.
 */
export let randInt = function (min, max, seed = Date.now(), algorithm = xorshift) {
    return Math.floor(rand(min, max, seed, algorithm));
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