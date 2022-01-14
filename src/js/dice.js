export function DiceFormula(formulaString) {
  let diceReg = /\d*d\d+/gi;
  let modReg = /[+-]\s*\d+$/;
  let arrayParsed = [];
  
  let arrayDice = formulaString.match(diceReg);
  arrayDice.forEach(element => {
    let count = 1;
    // get the number of dice eg 4 in 4d6
    if (element.match(/\d*(?=d)/)[0]) {count = element.match(/\d*(?=d)/)[0];}
    // get the number of sides eg 6 in 4d6
    let sides = element.match(/(?<=d)\d+/)[0];
    for (let i = 1; i <= count; i++) {
      arrayParsed.push(new Die(sides));
    }
  });

  this.mod = formulaString.match(modReg);
  if (this.mod) {
    //array becomes string - maybe refactor this
    this.mod = this.mod[0].replace(/ /g, '');
    //string becomes int
    this.mod[0] === '-' ? this.mod = 0 - parseInt(this.mod.slice(1)) : this.mod = parseInt(this.mod.slice(1));
  } else {
    this.mod = 0;
  }

  this.dice = arrayParsed;
}

DiceFormula.prototype.possibleCombos = function() {
  //create array of arrays for all possible dice rolls
  let diceExpanded = [];
  this.dice.forEach((die, index) => {
    diceExpanded.push([]);
    for (let i = 1; i <= die.sides; i++) {
      diceExpanded[index].push(i);
    }
  });

  //recursivesly determine all dice combos
  let arrayOfCombos = [];
  
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

  recurse(0, []);

  return arrayOfCombos;
};

DiceFormula.prototype.possibleResults = function(arrayOfCombos) {
  let arrayOfResults = arrayOfCombos.map((combo) => {
    combo = combo.reduce((a, b) => a + b);
    return combo + this.mod;
  });

  return arrayOfResults.sort((a, b) => a-b);
};

//returns an array with [0] = denominator, and consecutive indices = [result, numerator]
DiceFormula.prototype.resultsByFraction = function(arrayOfResults) {
  let outputArray = [arrayOfResults.length];
  let numerator = 1;
  let result = arrayOfResults[0];
  for (let i=1; i < arrayOfResults.length; i++) {
    if (arrayOfResults[i] === result) {
      numerator++;
    } else {
      outputArray.push([result, numerator]);
      numerator = 1;
      result = arrayOfResults[i];
    }
  }
  outputArray.push([result, numerator]);
  return outputArray;
};

//returns an array converting output of resultsByFraction to decimal weights
DiceFormula.prototype.resultsByWeight = function(arrayOfResultsByFraction) {
  let denominator = arrayOfResultsByFraction.shift();
  let outputArray = arrayOfResultsByFraction.map((resultFraction) => {
    return [resultFraction[0], resultFraction[1]/denominator];
  });
  return outputArray;
};


DiceFormula.prototype.roll = function() {
  let total = this.mod;
  this.dice.forEach((die) =>{
    total += die.roll();
  });
  return total;
};

DiceFormula.prototype.maxSides = function() {
  let max = 0;
  this.dice.forEach((die) => {
    if (die.sides > max) {max = die.sides;}
  });
  return max;
};

export function Die(sides) {
  this.sides = sides;
}

Die.prototype.roll = function() {
  return Math.ceil(Math.random() * this.sides);
};