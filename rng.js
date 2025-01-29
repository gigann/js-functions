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
    // console.log(rolls);

    return result;
}

/**
 *
 * @param {*} min inclusive minimum
 * @param {*} max exclusive maximum
 * @returns Returns a pseudorandom float between inclusive min and exclusive max
 */
export let randomFloat = function(min, max){
    return Math.random() * (max - min) + min;
};

/**
 *
 * @param {*} min inclusive minimum
 * @param {*} max exclusive maximum
 * @returns Returns a pseudorandom integer between inclusive min and exclusive max
 */
export let randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};