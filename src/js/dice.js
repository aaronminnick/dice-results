export function DiceFormula(formulaString) {
  let diceReg = /\d*d\d+/gi;
  let modReg = /[+-]\s*\d+$/;
  let arrayParsed = [];
  
  let arrayDice = formulaString.match(diceReg);
  arrayDice.forEach(element => {
    let count = 1;
    if (element.match(/\d*(?=d)/)[0]) {count = element.match(/\d*(?=d)/)[0]}
    let sides = element.match(/(?<=d)\d+/)[0];
    for (let i = 1; i <= count; i++) {
      arrayParsed.push(new Die(sides))
    }
  });

  this.mod = formulaString.match(modReg);
  if (this.mod) {
    this.mod = this.mod[0].replace(/ /g, '');
    this.mod[0] === '-' ? this.mod = 0 - parseInt(this.mod.slice(1)) : this.mod = parseInt(this.mod.slice(1));
  } else {
    this.mod = 0;
  }

  this.dice = arrayParsed;
}

DiceFormula.prototype.possibleResults = function() {
  let diceExpanded = [];
  this.dice.forEach((die, index) => {
    diceExpanded.push([]);
    for (let i = 1; i <= die.sides; i++) {
      diceExpanded[index].push(i);
    }
  });

  function recurse(currentDice, array) {
    let localArray = [];
    for (let i = 0; i <= diceExpanded[currentDice].length-1; i++) {
      localArray.push(diceExpanded[currentDice][i]);
      if (diceExpanded[currentDice + 1]) {
        recurse(currentDice + 1, array.concat(localArray));
      } else {
        arrayOfCombos.push(array.concat(localArray));
      }
      localArray.pop();
    }
  }

  let arrayOfCombos = [];
  recurse(0, []);

  let arrayOfResults = arrayOfCombos.map((combo) => {
    combo = combo.reduce((a, b) => a + b);
    return combo + this.mod;
  });

  return arrayOfResults;
};

DiceFormula.prototype.roll = function() {
  let total = this.mod;
  this.dice.forEach((die) =>{
    total += die.roll;
  });
  return total;
}

export function Die(sides) {
  this.sides = sides
}

Die.prototype.roll = function() {
  return Math.ceil(Math.random() * this.sides);
};