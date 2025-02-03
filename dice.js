function tokenize(input) {
    const tokenRegex = /(\d+x)?\d*d\d+(!)?(dl\d+|dh\d+)?([+-]\d+)?|[\+\-*/()]|\d+/g;
    return input.match(tokenRegex) || [];
}

function parseExpression(tokens) {
    let index = 0;

    function parseTerm() {
        let left = parseFactor();

        while (index < tokens.length && (tokens[index] === "*" || tokens[index] === "/")) {
            const operator = tokens[index];
            index++;
            const right = parseFactor();
            left = { type: "BinaryExpression", operator, left, right };
        }

        return left;
    }

    function parseFactor() {
        const token = tokens[index];
        index++;

        if (/\d*d\d+/.test(token)) {
            return { type: "DiceNotation", value: token };
        } else if (/\d+/.test(token)) {
            return { type: "Number", value: parseInt(token, 10) };
        } else if (token === "(") {
            const expr = parseExpression(tokens);
            if (tokens[index] !== ")") {
                throw new Error("Expected closing parenthesis");
            }
            index++;
            return expr;
        } else {
            throw new Error(`Unexpected token: ${token}`);
        }
    }

    let left = parseTerm();

    while (index < tokens.length && (tokens[index] === "+" || tokens[index] === "-")) {
        const operator = tokens[index];
        index++;
        const right = parseTerm();
        left = { type: "BinaryExpression", operator, left, right };
    }

    return left;
}

function evaluateAST(node) {
    switch (node.type) {
        case "Number":
            return node.value;
        case "DiceNotation":
            return rollDice(node.value);
        case "BinaryExpression":
            const left = evaluateAST(node.left);
            const right = evaluateAST(node.right);
            switch (node.operator) {
                case "+": return left + right;
                case "-": return left - right;
                case "*": return left * right;
                case "/": return left / right;
                default: throw new Error(`Unknown operator: ${node.operator}`);
            }
        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
}

export let rollDice = function (notation) {
    const match = notation.match(/^(\d*)d(\d+)(!)?(dl(\d+)|dh(\d+))?([+-]\d+)?$/i);
    if (!match) {
        throw new Error("Invalid dice notation");
    }

    const [, numDice, numSides, explosion, , dropLow, dropHigh, modifier] = match;
    const diceCount = numDice ? parseInt(numDice, 10) : 1;
    const sides = parseInt(numSides, 10);

    let rolls = [];
    for (let i = 0; i < diceCount; i++) {
        let roll = Math.floor(Math.random() * sides) + 1;
        if (explosion && roll === sides) {
            roll += rollDice(`1d${sides}`); // Recursively roll again for explosions
        }
        rolls.push(roll);
    }

    if (dropLow) {
        rolls.sort((a, b) => a - b);
        rolls = rolls.slice(parseInt(dropLow, 10));
    } else if (dropHigh) {
        rolls.sort((a, b) => b - a);
        rolls = rolls.slice(parseInt(dropHigh, 10));
    }

    const total = rolls.reduce((sum, roll) => sum + roll, 0) + (modifier ? parseInt(modifier, 10) : 0);
    return total;
}

// Example usage
// const input = "2d6 + 3d4 * 2";
// const tokens = tokenize(input);
// const ast = parseExpression(tokens);
// const result = evaluateAST(ast);
// console.log(result); // Output: Result of the expression (e.g., 14)