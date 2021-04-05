const style = 'background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 50px ; display:flex';
const parent = document.querySelector('.calc-section');
const selNumGames = document.querySelector('#selNumGames');
const btnCalculate = document.querySelector('#calculate-parlay-btn');
const gamesInputs = document.querySelector('#games-input-list');
const result = document.querySelector('.convertion-results-wrapper');
const infoBtn = document.querySelector('.infoBtn');
const inforesetBtn = document.querySelector('.resetBtn');
//RESULTS
const spnMathOdds = document.querySelector('#spnMathOdds');
const spnTrueParlayOdds = document.querySelector('#spnTrueParlayOdds');
const spnRiskWinAmount = document.querySelector('#spnRiskWinAmount');
const spnPremiumTrue = document.querySelector('#spnPremiumTrue');
const spnPremiumMath = document.querySelector('#spnPremiumMath');
//VALUES
const oddsoffered = document.querySelector('#odds-offered');
const selRiskWin = document.querySelector('#selRiskWin');
const riskamountD = document.querySelector('#risk-amount');
const selLineSet = document.querySelector('#selLineSet');
//Fix padding
var article = parent.closest('article');
article.classList.add('remoMargin');

console.log(`%c 🏆 Calculator v1.4`, style);
//function add lines
function setgameLines() {
	numberRows = selNumGames.value;
	numberRows = Number(numberRows);

	let contentToPut = '';
	if (typeof contentToPut !== 'undefined') {
		for (i = 1; i < numberRows + 1; i++) {
			contentToPut += `
    <div class="input-field my-3"> 
    <span id="txtLine_${i}_label">Game ${i} Line:</span>
    <div class="input-row"> 
    <input id="txtLine_${i}" type="text" class="inputLine odds-value-input" autocomplete="off" value="0"> 
    </div></div>
    `;
		}

		gamesInputs.innerHTML = contentToPut;
	}
}

//RESET
inforesetBtn.addEventListener('click', () => {
	selNumGames.value = 3;
	setgameLines();
	const inputs = document.querySelectorAll('.inputLine');
	inputs.forEach(item => (item.value = 0));
	riskamountD.value = 0;
	result.classList.remove('show');
});
//Carga lineas al inicio
window.addEventListener('load', event => {
	//console.log('page is fully loaded');
	setgameLines();
});
//si cambia anade lineas
selNumGames.addEventListener('change', () => setgameLines());

const showResults = function (total, riskamount, payoutTotal) {
	// console.log('total1 pay out less 50 ', total);
	// console.log('payoutTotal', payoutTotal);
	// console.log('total  ', total * riskamount);

	let resultDiv = `<div class="result-title">Result</div>

  <div class="result-row">
  <span class="result-label"> Bet/Wager Amount:</span>
  <span class="result-value">$ ${riskamount}</span>
  </div>

  <div class="result-row">
  <span class="result-label">Total:</span>
  <span class="result-value">$ ${parseFloat(total * riskamount).toFixed(2)}</span>
	</div>

  <div class="result-row profit">
  <span class="result-label"> Profit:</span>
  <span class="result-value">$ ${parseFloat(total * riskamount - riskamount).toFixed(2)}</span>
  </div>
</div>
`;
	result.innerHTML = resultDiv;
	result.classList.remove('show');
	result.classList.add('show');
};
const showInfo = function () {
	result.classList.toggle('show');
	if (result.classList.contains('show')) {
		result.innerHTML = `In the boxes under "Odds" enter the moneyline odds of each game in your parlay.
    If you choose a favorite, you must enter the moneyline with a minus (-) sign at the beginning (e.g. -120). Note: Most standard pointspread and total wagers have -110 moneyline odds.
    If you choose an underdog, simply enter the moneyline odds; no plus sign (+) is necessary (e.g. 120).
    Do not include decimal points.<br/>
    
    Ignore the boxes that are not included in your parlay (leave "0" in each box; they will not be factored into the parlay).
    Enter the amount of your wager in the box next to "Amount($)" and click on "Calculate". The amount of a winning parlay wager will appear in the box next to "Payout". Note: The "Payout" does not include the amount wagered.
    To calculate another parlay, click "Clear" and start again.
    Good luck!`;
	} else {
		result.innerHTML = ``;
	}
};
function calculateParley() {
	console.log('calculate1');
	let payoutTotal = [];
	const getInputs = document.querySelectorAll('.inputLine');

	for (i = 0; i < getInputs.length; i++) {
		let lineValue = getInputs[i].value;
		lineValue = Number(lineValue);
		let number = 0;
		if (lineValue === 0) {
			alert('Please Fill out the Game lines ');
			document.querySelector('#txtLine_1').focus();
			return;
		}

		if (riskamountD.value === '0') {
			alert('Please Fill out the amount field ');
			document.querySelector(`#risk-amount`).focus();
			return;
		}
		if (lineValue > 100) {
			number = Math.abs(lineValue / 100) + 1;
			number = parseFloat(number).toFixed(4);
			payoutTotal.push(number);
		} else {
			number = Math.abs(100 / lineValue) + 1;
			number = parseFloat(number).toFixed(4);
			payoutTotal.push(number);
		}
	}

	const total = payoutTotal.reduce((a, b) => a * b);

	showResults(total, riskamountD.value, payoutTotal);
}

btnCalculate.addEventListener('click', () => {
	calculateParley();
});

infoBtn.addEventListener('click', () => {
	//console.log('info');
	showInfo();
});
