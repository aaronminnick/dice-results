import { DiceFormula } from "./js/dice";
import { Stacks } from "./js/visualizer";
import $ from "jquery";
import "./css/styles.css";

$("#formula-form").on("submit", (event) => {
  event.preventDefault();
  let formula = new DiceFormula($("#dice-formula").val());
  $("#roll-visualizer-div").html(Stacks(formula));
});