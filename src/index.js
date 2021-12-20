import { DiceFormula } from "./js/dice";
import $ from "jquery";

$("#formula-form").on("submit", (event) => {
  event.preventDefault();
  let formula = new DiceFormula($("#dice-formula").val());
  let result = formula.roll();
  console.log(result);
  $("#result-div").html(`<p>Result: ${result}</p>`);
});