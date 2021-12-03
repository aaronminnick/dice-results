function DiceFormula(formulaString) {
  let diceReg = /\d*d\d+/gi;
  let modReg = /[+-]\s*\d+$/;
  let arrayParsed = [];
  
  let arrayDice = formulaString.match(diceReg);
  arrayDice.forEach(element => {
    let count = 1;
    if (element.match(/\d*(?=d)/)[0]) {count = element.match(/\d*(?=d)/)[0]}
    let sides = element.match(/d\d+/)[0];
    for (let i = 1; i <= count; i++) {
      arrayParsed.push(new Dice(sides))
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
  let arrayOfResults = [];
  let mod = 0;

  let diceExpanded = [];
  this.dice.forEach((dice) => {

  });


  return arrayOfResults;
};

DiceFormula.prototype.roll = function() {
  let total = this.mod;
  this.dice.forEach((dice) =>{
    total += dice.roll;
  });
  return total;
}

function Dice(sides) {
  this.sides = sides
}

Dice.prototype.roll = function() {
  return Math.ceil(Math.random() * this.sides);
};