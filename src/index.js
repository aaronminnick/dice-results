function possibleResults(arrayOfDice, mod) {
  let arrayOfResults = [];

  return arrayOfResults;
}

function parseDiceFormula(diceString) {
  let arrayOfParsed = [];
  let diceReg = /\d*d\d+/i;
  let modReg = /(?<=[+-]\s*)\d$/;
  let test = '1d4 + 2d6 + d8 - 5'
  console.log(test.match(diceReg));
  console.log(test.match(modReg));


  return arrayOfParsed;
}

function Dice(sides) {
  this.sides = sides
}

Dice.prototype.roll {
  return Math.ceil(Math.random() * this.sides);
}