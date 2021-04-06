var j = jQuery.noConflict();
var current_environment = document.location.hostname;
function track_user_activity(t, e, c = '', i = '') {
	console.log('test');
}

var i,
	bet_count = 0,
	total_stake = j('#total_stake').val(),
	status = !0;
function validate_bet() {
	for (status = !0, exist_bet_count = 0, bet_count = j('.arbitrage-bet-row').length, i = 1; i <= bet_count; i++) {
		'' == j('#odds_' + i).val() || null == j('#odds_' + i).val()
			? (j('#stake_' + i).text('$0.00'), j('#payout_' + i).text('$0.00'), j('#total_payout, #total_profit').text('$0.00'), j('#roi').text('0.00'))
			: exist_bet_count++;
	}
	if (0 == exist_bet_count || 1 == exist_bet_count)
		for (status = !1, i = 1; i <= bet_count; i++) {
			('' != j('#odds_' + i).val() && null != j('#odds_' + i).val()) ||
				j('#odds_' + i)
					.attr('placeholder', 'Please Enter Bet ' + i + ' Odds.')
					.addClass('error-class')
					.val('');
		}
	if (1 == status || 'true' == status) {
		for (i = 1; i <= bet_count; i++)
			if ('' != j('#odds_' + i).val() && null != j('#odds_' + i).val()) {
				var t;
				('' != (t = convert_odds('odds_' + i, j('#odds_' + i).val())) && null != t && 'undefined' != t) ||
					((status = !1),
					j('#stake_' + i).text('$0.00'),
					j('#payout_' + i).text('$0.00'),
					j('#total_payout, #total_profit').text('$0.00'),
					j('#roi').text('0.00'),
					j('#odds_' + i)
						.attr('placeholder', 'Please Enter Valid Bet ' + i + ' Odds')
						.addClass('error-class')
						.val(''));
			}
	} else {
		for (i = 1; i <= bet_count; i++) j('#stake_' + i).text('$0.00'), j('#payout_' + i).text('$0.00');
		j('#total_payout, #total_profit').text('$0.00'), j('#roi').text('0.00');
	}
	return status;
}
function validate_stake() {
	var t = !0;
	return (
		'' == (total_stake = j('#total_stake').val()) || null == total_stake
			? ((t = !1), j('#total_stake').attr('placeholder', 'Please Enter Stake').addClass('error-class').val(''))
			: '' == total_stake ||
			  null == total_stake ||
			  ('.' != total_stake && /^[0-9.]+$/.test(total_stake) && parseFloat(total_stake) != parseFloat(0)) ||
			  ((t = !1), j('#total_stake').attr('placeholder', 'Please Enter Valid Stake').addClass('error-class').val('')),
		t
	);
}
function calculate_bet_stake() {
	total_stake = j('#total_stake').val();
	var t = 0,
		a = 0;
	for (bet_count = j('.arbitrage-bet-row').length, i = 1; i <= bet_count; i++)
		if ('' != j('#odds_' + i).val() && null != j('#odds_' + i).val()) {
			var e = '';
			if (((e = convert_odds('odds_' + i, j('#odds_' + i).val())), (1 == status || 'true' == status) && '' != e && null != e && e > 1)) a = parseFloat(1 / e) + a;
			else 1 == e && error_message('odds_' + i);
		}
	a = parseFloat(1 / a);
	var o = 0;
	for (i = 1; i <= bet_count; i++)
		if ('' != j('#odds_' + i).val() && null != j('#odds_' + i).val()) {
			e = '';
			if (((e = convert_odds('odds_' + i, j('#odds_' + i).val())), (1 == status || 'true' == status) && '' != e && null != e && e > 1)) {
				var s = 0,
					r = 0,
					d = parseFloat(1 / e) * a,
					l = ((s = parseFloat(d) * parseFloat(total_stake)), (r = parseFloat(s) * e), parseFloat(1 / e) * parseFloat(total_stake));
				j('#stake_' + i).text('$' + s.toFixed(2));
				parseFloat(e), parseFloat(l);
				j('#payout_' + i).text('$' + r.toFixed(2)), (t = parseFloat(r) + parseFloat(t)), o++;
			}
		}
	if (1 == status || 'true' == status) {
		(t = parseFloat(t) / parseFloat(o)), j('#total_payout').text('$' + t.toFixed(2));
		var _ = parseFloat(t) - parseFloat(total_stake);
		_ >= 0 ? j('#total_profit').text('$' + _.toFixed(2)) : j('#total_profit').text('-$' + Math.abs(_).toFixed(2));
		var u = ((parseFloat(_) / parseFloat(total_stake)) * 100).toFixed(2);
		j('#roi').text(u + '%'), track_user_activity('button_clicked', 'home', 'clicked_button_name', 'calculate');
	}
}
function convert_odds(t, a) {
	if ('' != a && null != a && 'undefined' != a && 0 != a) {
		var e = a.split('.'),
			o = a.split('/'),
			s = (aus_odds = uk_odds = '');
		if ('' != e && null != e && null == o[1])
			if ('+' != a.charAt(0) && '-' != a.charAt(0))
				if (a > 1) {
					update_odds = round_two_digit(a - 1);
					var r = (update_odds + '.').split('.')[1].length,
						d = Math.pow(10, r),
						i = round_two_digit(update_odds * d),
						l = calculate_gcd(i, d);
					if (
						((uk_odds = i / l + '/' + d / l),
						a <= 100 && (uk_odds = odds_conversion_decimal_to_fraction_odds(a)),
						a >= 2 ? (s = 100 * (a - 1)) : a < 2 && (s = -100 / (a - 1)),
						(s = a > 1 ? Math.round(s) : 'N/A'),
						parseFloat(a) != 1 / 0 && 'NaN' != parseFloat(a) && uk_odds != 1 / 0 && NaN != uk_odds && s != 1 / 0 && NaN != s && 0 != j.isNumeric(a))
					)
						return parseFloat(a).toFixed(3);
					error_message(t);
				} else error_message(t);
			else {
				if (((update_odds = parseFloat(a)), '-' == a.charAt(0))) {
					update_odds = -update_odds;
					l = calculate_gcd(100, update_odds);
					(numerator = 100 / l), (denominator = update_odds / l), (aus_odds = 100 / update_odds + 1);
				} else {
					l = calculate_gcd(100, update_odds);
					(numerator = update_odds / l), (denominator = 100 / l), (aus_odds = update_odds / 100 + 1);
				}
				if (
					((uk_odds = numerator + '/' + denominator),
					aus_odds <= 100 && (uk_odds = odds_conversion_decimal_to_fraction_odds(aus_odds)),
					(aus_odds = isNaN(a) ? 'N/A' : aus_odds.toFixed(3)),
					a != 1 / 0 && 'NaN' != a && uk_odds != 1 / 0 && NaN != uk_odds && s != 1 / 0 && NaN != s && 0 != j.isNumeric(a))
				)
					return aus_odds;
				error_message(t);
			}
		else if ('' != o[1] && null != o[1]) {
			if (
				((aus_odds = o[0] / o[1] + 1),
				(s = parseInt(o[0]) > parseInt(o[1]) ? (o[0] / o[1]) * 100 : -100 / (o[0] / o[1])),
				(s = Math.round(s)),
				'Infinity' != a && 'Infinity' != aus_odds && !isNaN(aus_odds) && 'Infinity' != s && !isNaN(s))
			)
				return aus_odds.toFixed(3);
			error_message(t);
		}
	}
}
function odds_conversion_decimal_to_fraction_odds(t) {
	var a = [];
	return (
		j.each(
			{
				'1/100': '1.01',
				'1/50': '1.02',
				'1/33': '1.0303',
				'1/25': '1.04',
				'1/10': '1.1',
				'1/8': '1.125',
				'1/7': '1.143',
				'1/6': '1.167',
				'1/5': '1.2',
				'2/9': '1.222',
				'1/4': '1.25',
				'2/7': '1.286',
				'3/10': '1.3',
				'1/3': '1.333',
				'4/11': '1.364',
				'2/5': '1.4',
				'4/9': '1.444',
				'1/2': '1.5',
				'8/15': '1.533',
				'4/7': '1.571',
				'8/13': '1.615',
				'4/6': '1.667',
				'8/11': '1.727',
				'4/5': '1.8',
				'5/6': '1.833',
				'10/11': '1.909',
				'1/1': '2.0',
				'11/10': '2.1',
				'6/5': '2.2',
				'5/4': '2.25',
				'13/10': '2.3',
				'11/8': '2.375',
				'6/4': '2.5',
				'13/8': '2.625',
				'7/4': '2.75',
				'2/1': '3.0',
				'11/5': '3.2',
				'9/4': '3.25',
				'12/5': '3.4',
				'5/2': '3.5',
				'11/4': '3.75',
				'3/1': '4.0',
				'10/3': '4.333',
				'7/2': '4.5',
				'4/1': '5.0',
				'9/2': '5.5',
				'5/1': '6.0',
				'11/2': '6.5',
				'6/1': '7.0',
				'13/2': '7.5',
				'7/1': '8.0',
				'15/2': '8.5',
				'8/1': '9.0',
				'17/2': '9.5',
				'9/1': '10.0',
				'10/1': '11.0',
				'11/1': '12.0',
				'12/1': '13.0',
				'14/1': '15.0',
				'16/1': '17.0',
				'20/1': '21.0',
				'25/1': '26.0',
				'33/1': '34.0',
				'40/1': '41.0',
				'50/1': '51.0',
				'66/1': '67.0',
				'100/1': '101.0',
			},
			function (e, o) {
				var s = 0;
				(o = parseFloat(o)) > (t = parseFloat(t)) ? (s = o - t) : o < t && (s = t - o);
				var r = { key: e, val: s };
				a.push(r);
			}
		),
		a.sort((t, a) => (t.val > a.val ? 1 : -1)),
		a[0].key
	);
}
function calculate_gcd(t, a) {
	return a ? (gcd = calculate_gcd(a, t % a)) : t;
}
function round_two_digit(t) {
	return (t + '.').split('.')[1].length > 0 && (t = (Math.round(100 * t) / 100).toFixed(2)), t;
}
function Validate(t) {
	var a = new RegExp('^[0-9-+./]'),
		e = String.fromCharCode(t.charCode ? t.which : t.charCode);
	if (!a.test(e)) return t.preventDefault(), !1;
}
function error_message(t = '') {
	for (
		bet_count = j('.arbitrage-bet-row').length,
			'' != t &&
				(j('#' + t).hasClass('error-class') ||
					j('#' + t)
						.attr('placeholder', 'Please Enter Valid Bet ' + t.replace('odds_', '') + ' Odds')
						.addClass('error-class')
						.val('')),
			i = 1;
		i <= bet_count;
		i++
	)
		'' == t &&
			(j('#odds_' + i).hasClass('error-class') ||
				j('#odds_' + i)
					.attr('placeholder', 'Please Enter Valid Bet ' + i + ' Odds')
					.addClass('error-class')
					.val('')),
			j('#stake_' + i).text('$0.00'),
			j('#payout_' + i).text('$0.00');
	j('#total_payout, #total_profit').text('$0.00'), j('#roi').text('0.00'), (status = !1);
}
j(document).on('click', '.sidebar-nav-click', function (t) {
	var a = j(this).data('sidebar_nav');
	(a = a.replace(/ /g, '_').toLowerCase()), track_user_activity('link_clicked', 'home', 'sidebar_navigation_clicked', a);
}),
	j(document).on('click', '.wager-term-click', function (t) {
		var a = j(this).data('wager_term');
		(a = a.replace(/ /g, '_').toLowerCase()), track_user_activity('link_clicked', 'home', 'wagering_term_clicked', a);
	}),
	j(document).on('click, focus', '.form-input', function (t) {
		var a = j(this).attr('placeholder');
		(a = a.replace(/ /g, '_').toLowerCase()), track_user_activity('field_clicked', 'home', 'input_field_clicked', a);
	}),
	j(document).on('click', '.w-vulcan-v2-button', function (t) {
		var a = j(this).attr('title');
		('Play Video' != a && void 0 !== a) || track_user_activity('video_clicked', 'home', 'video_played', 'how_to_use_the_arbitrage_calculator');
	}),
	j('#submit_arbitrage').on('click', function () {
		if (((bet_status = validate_bet()), (stake_validate = validate_stake()), (total_stake = j('#total_stake').val()), ('true' != bet_status && 1 != bet_status) || 1 != stake_validate)) {
			for (bet_count = j('.arbitrage-bet-row').length, i = 1; i <= bet_count; i++) j('#stake_' + i).text('$0.00'), j('#payout_' + i).text('$0.00');
			j('#total_payout, #total_profit').text('$0.00'), j('#roi').text('0.00');
		} else calculate_bet_stake();
	}),
	j(document).on('click', '#reset', function () {
		for (bet_count = j('.arbitrage-bet-row').length, i = 1; i <= bet_count; i++)
			j('#stake_' + i).text('$0.00'), j('#payout_' + i).text('$0.00'), j('#odds_' + i).attr('placeholder', 'Please Enter Bet ' + i + ' Odds.');
		j('.more_rows').remove(),
			j('#total_payout, #total_profit').text('$0.00'),
			j('#roi').text('0.00'),
			j('input[type="text"]').val('').removeClass('error-class'),
			track_user_activity('button_clicked', 'home', 'clicked_button_name', 'reset');
	}),
	j(document).on('click', '#add_more', function () {
		var t = parseInt(j('.arbitrage-bet-row:last').attr('data-id')),
			a =
				'<div class="col-input-block more_rows arbitrage-bet-row" data-id="' +
				(t += 1) +
				'">\t\t\t\t\t\t\t<label>Bet ' +
				t +
				'</label>\t\t\t\t\t\t\t<div class="input-odds"><input maxlength="10" class="form-input" type="text" id="odds_' +
				t +
				'" placeholder="Please Enter Bet ' +
				t +
				' Odds" onkeypress="return Validate(event)">\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>';
		j('.bet-row').append(a),
			j('.stake-row').append(
				'<h5 class="odds-title title-mob more_rows" id="stake_title_' +
					t +
					'">Stake Bet ' +
					t +
					'</h5><div class="input-text more_rows"> <span class="text-input" id="stake_' +
					t +
					'">$0.00 </span> </div>'
			),
			j('.payout-row').append(
				'<h5 class="odds-title title-mob more_rows" id="payout_title_' +
					t +
					'">Payout Bet ' +
					t +
					'</h5><div class="input-text more_rows"> <span class="text-input" id="payout_' +
					t +
					'">$0.00 </span> </div>'
			),
			track_user_activity('button_clicked', 'home', 'clicked_button_name', 'more_rows');
	}),
	j('input[type=text]').keypress(function () {
		j(this).removeClass('error-class');
	}),
	j('input[type=text]').click(function () {
		j(this).removeClass('error-class');
	});
