// a lot of tiny squares in stacks which fill up to represent rolled dice, then filled squares are collected into a results pool or bar showing total (increment as part of animation)
export function Stacks(formula) {
  let outputHtml = "";
  let maxSides = 0;
  let total = 0;
  formula.dice.forEach((die) => {
    if (die.sides > maxSides) {maxSides = die.sides;}
    let result = die.roll();
    total += result;
    outputHtml += `<div class="point-column">`;
    for (let i = 0; i < die.sides; i++)
    {
      let r = result;
      if (r > 0) {
        outputHtml += `<div class="filled-point" />`;
        r --;
      } else {
        outputHtml += `<div class="empty-point" />`;
      }
    }
    outputHtml += `</div>`;
    // use result somehow? otherwise can use in place of r above
  });
  outputHtml = `<div class="stacks-visual" style="--max-sides : ${maxSides}; --num-dice: ${formula.dice.length}">` + outputHtml + `</div><div class="stacks-visual-result>${result}</div>`;
}