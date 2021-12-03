function DiceFormula(formulaString) {
  let diceReg = /\d*d\d+/gi;
  let modReg = /[+-]\s*\d+$/;
  let arrayParsed = [];
  
  let arrayDice = formulaString.match(diceReg);
  arrayDice.forEach(element => {
    let count = 1;
    if (element.match(/\d*(?=d)/)[0]) {count = element.match(/\d*(?=d)/)[0]}
    let sides = element.match(/(?<=d)\d+/)[0];
    console.log(sides);
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
  let arrayOfResults = [];

  let diceExpanded = [];
  this.dice.forEach((die, index) => {
    diceExpanded[index] = [];
    console.log(die);
    for (let i = 1; i <= die.sides; i++) {
      console.log(i + this.mod);
      diceExpanded[index][i - 1] = i + this.mod;
    }
  });
  console.log(diceExpanded);


  return arrayOfResults;
};

DiceFormula.prototype.possibleResults = function() {
  let arrayOfResults = [];
  let mod = 0;

  let diceExpanded = [];
  this.dice.forEach((die, index) => {
    diceExpanded[index] = [];
    for (let i = 1; i <= die.sides; i++) {
      diceExpanded[index][i - 1] = i;
    }
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

function Die(sides) {
  this.sides = sides
}

Die.prototype.roll = function() {
  return Math.ceil(Math.random() * this.sides);
};