type paramsType = typeof import("../params-example.json");

// YOU MOST PROVIDE A params.json yourself
import * as params from "../params.json";

function calcIncomeOverTime(
  currentMonthlyIncome: number,
  timeInYears: number,
  raiseFrequency: number,
  raiseRate: number
): number[] {
  let currentIncome = currentMonthlyIncome;

  const income = [];
  for (let i = 0; i < timeInYears; i++) {
    if (i > 0) {
      currentIncome *= (1 + raiseRate);
    }

    income.push(currentIncome);
  }

  return income;
}

function calcExtraMoneyOverTime(
  incomeGrowth: number[],
  currentMonthlyExpenses: number,
  inflationRate: number,
  monthlyMortgage: number
): number[] {
  let monthlyExpenses = currentMonthlyExpenses;
  return incomeGrowth.map((monthlyIncome, index) => {
    // for this we're going to pretend inflation happens all at once at the end of the year...
    // in reality it happens at different times for different products / services but all we can
    // really do is get close by averaging this stuff
    if (index > 0) {
      monthlyExpenses *= (1 + inflationRate);
    }

    return monthlyIncome - monthlyMortgage - monthlyExpenses;
  });
}

function calcHomeAppreciationOverTime(
  homePurchasePrice: number,
  mortgageLength: number,
  homeAppreciationRate: number
): number {
  let homeValue = homePurchasePrice;
  for (let i = 0; i < mortgageLength; i++) {
    if (i > 0) {
      homeValue *= (1 + homeAppreciationRate);
    }
  }

  return homeValue;
}








(function main(params: paramsType): void {
  const {currentMonthlyIncome, mortgageLength, raiseFrequency, raiseRate} = params;
  const incomeOverTime = calcIncomeOverTime(currentMonthlyIncome, mortgageLength, raiseFrequency, raiseRate);

  const {currentMonthlyExpenses, inflationRate, monthlyMortgage} = params;
  const extraMoneyOverTime = calcExtraMoneyOverTime(incomeOverTime, currentMonthlyExpenses, inflationRate, monthlyMortgage);

  const {homePurchasePrice, homeAppreciationRate} = params;
  const homeAppreciationOverTime = calcHomeAppreciationOverTime(homePurchasePrice, mortgageLength, homeAppreciationRate);

  /**
   * These are the strategies I want to explore:
   *
   * - use extra money to make principal payments and pay down the mortgage early,
   *   then invest all the extra money plus the money I won't have to be paying towards a
   *   mortgage anymore
   *
   * - make minimum mortgage payments and invest the extra money for the full life of the mortgage
   */

  // TODO: finish the calculation to determine these two outcomes



})(params);