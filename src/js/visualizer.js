// a lot of tiny squares in stacks which fill up to represent rolled dice, then filled squares are collected into a results pool or bar showing total (increment as part of animation)
export function Stacks(formula) {
  let outputHtml = "";
  let maxSides = 0;
  let total = 0;
  formula.dice.forEach((die) => {
    let maxSides = formula.maxSides();
    let result = die.roll();
    total += result;
    outputHtml += `<div class="point-column">`;
    for (let i = maxSides; i > 0; i--)
    {
      if (i > die.sides) {
        outputHtml += `<div class="no-point"></div>`
      } else if (i > result) {
        outputHtml += `<div class="empty-point"></div>`;
      } else {
        outputHtml += `<div class="filled-point"></div>`;
      }
    }
    outputHtml += `</div>`;
  });
  outputHtml = `
    <div class="stacks-visual" style="--max-sides : ${maxSides}; --num-dice: ${formula.dice.length}">
      ${outputHtml}
    </div>
    <div class="stacks-visual-result">
      <p>Result: ${total}</p>
    </div>
  `;
  return outputHtml;
}