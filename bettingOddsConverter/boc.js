const trigger = document.querySelectorAll('.popover__trigger');
console.log(trigger);
console.log('entre js1');
const addShow = function (e) {
	const div = e.target.offsetParent;
	div.classList.toggle('show');
};
trigger.forEach(item => {
	console.log(item);
	item.addEventListener('click', e => addShow(e));
});
function oddsConverter(a) {
	var b = a.form.elements.us_odds,
		c = a.form.elements.decimal_odds,
		d = a.form.elements.fractional_odds,
		e = a.form.elements.implied_probability,
		f = a.form.elements.bet,
		g = a.form.elements.payout,
		h = 0;
	var bet = true;
	switch (a) {
		case b:
			h = decimalFromUS(a.value);
			break;
		case c:
			h = parseFloat(a.value);
			break;
		case d:
			h = decimalFromFraction(a.value);
			break;
		case e:
			h = decimalFromImpliedProbability(a.value);
			break;
		case f:
			if (b.value) {
				h = decimalFromUS(b.value);
			} else {
				h = decimalFromUS(100);
			}
			break;
		case g:
			bet = false;
			if (b.value) {
				h = decimalFromUS(b.value);
			} else {
				h = decimalFromUS(100);
			}
			break;
	}
	if (bet) {
		!isNaN(h) &&
			h > 0 &&
			((b.value = usOddsFromDecimal(h)), (c.value = (Math.round(100 * h) / 100).toFixed(2)), (d.value = fractionalFromDecimal(h)), (e.value = impliedProbabilityFromDecimal(h).toFixed(2) + '%')),
			(f.value = (Math.round(100 * parseFloat(f.value)) / 100).toFixed(2)),
			(g.value = (Math.round((h - 1) * parseFloat(f.value) * 100) / 100).toFixed(2));
	} else {
		!isNaN(h) &&
			h > 0 &&
			((b.value = usOddsFromDecimal(h)), (c.value = (Math.round(100 * h) / 100).toFixed(2)), (d.value = fractionalFromDecimal(h)), (e.value = impliedProbabilityFromDecimal(h).toFixed(2) + '%')),
			(g.value = (Math.round(100 * parseFloat(g.value)) / 100).toFixed(2)),
			calculateMLAmount(f, b.value, g.value);
	}
}
function calculateMLAmount(f, odds, towin) {
	odds = Number(odds);
	towin = Number(towin);
	if (odds > 0) {
		Amount = towin / (odds * 0.01);
		var CalcA = Amount.toFixed(2);
	} else if (odds < 0) {
		Amount = towin * (odds * -0.01);
		var CalcA = Amount.toFixed(2);
	}
	f.value = CalcA;
}

function decimalFromFraction(a) {
	var b = a.split('/');
	return 2 == b.length && !isNaN(b[0]) && !isNaN(b[1]) && b[0] / b[1] + 1;
}

function decimalFromImpliedProbability(a) {
	return 100 / parseFloat(a);
}

function decimalFromUS(a) {
	return a > 0 ? a / 100 + 1 : (100 / a) * -1 + 1;
}

function impliedProbabilityFromDecimal(a) {
	return 100 / a;
}

function usOddsFromDecimal(a) {
	return (a -= 1), a < 1 ? '-' + (100 / a).toFixed(2) : '+' + (100 * a).toFixed(2);
}

function fractionalFromDecimal(a) {
	a = parseFloat(a).toFixed(2);
	var b = 1e4 * (a - 1),
		c = 1e4;
	(b = Math.round(b)), (c = Math.round(c));
	var d = reduce(b, c);
	return (b = d[0]), (c = d[1]), b + '/' + c;
}

function reduce(a, b) {
	var c = new Array(2),
		d = GCD(a, b);
	return (c[0] = a / d), (c[1] = b / d), c;
}

function GCD(a, b) {
	var c, d;
	if (a < b) (c = b), (d = a);
	else if (a > b) (c = a), (d = b);
	else if (a == b) return a;
	for (;;) {
		if (0 == d) return c;
		var e = d;
		(d = c % d), (c = e);
	}
}

function chance_odds(a) {
	var b = parseFloat(document.calc.chance.value);
	b > 0
		? ((european = places(1 / b, 2)),
		  (decimal = 1 / b - 1),
		  (document.calc.european.value = european),
		  decimal >= 1 ? (american = '+' + Math.round(100 * decimal)) : (american = Math.round(-100 / decimal)),
		  (document.calc.american.value = american),
		  (english = fraction(decimal)),
		  (document.calc.english.value = english))
		: ((document.calc.european.value = ''), (document.calc.english.value = ''), (document.calc.american.value = ''));
}

function places(a, b) {
	var c = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
	return c;
}

function fraction(a) {
	for (denom = 1; denom < 99; denom++) if (Math.round(100 * a * denom) == 100 * Math.round(a * denom)) return Math.round(a * denom) + '/' + denom;
	return !1;
}

function clearForm(form) {
	form.us_odds.value = '';
	form.decimal_odds.value = '';
	form.fractional_odds.value = '';
	form.implied_probability.value = '';
	form.bet.value = '100';
	form.payout.value = '';
}
