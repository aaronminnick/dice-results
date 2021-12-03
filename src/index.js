function possibleResults(arrayOfDice, mod) {
  let arrayOfResults = [];

  return arrayOfResults;
}

function parseDiceFormula(diceString) {
  let diceReg = /\d*d\d+/gi;
  let modReg = /[+-]\s*\d+$/;
  let arrayParsed = [];
  
  let arrayDice = diceString.match(diceReg);
  arrayDice.forEach(element => {
    let count = 1;
    if (element.match(/\d*(?=d)/)[0]) {count = element.match(/\d*(?=d)/)[0]}
    let sides = element.match(/d\d+/)[0];
    for (let i = 1; i <= count; i++) {
      arrayParsed.push(new Dice(sides))
    }
  });

  let mod = diceString.match(modReg)[0].replace(/ /g, '');
  mod[0] === '-' ? mod = 0 - parseInt(mod.slice(1)) : mod = parseInt(mod.slice(1));
  arrayParsed.push(mod);
  
  return arrayParsed;
}

function Dice(sides) {
  this.sides = sides
}

Dice.prototype.roll {
  return Math.ceil(Math.random() * this.sides);
}