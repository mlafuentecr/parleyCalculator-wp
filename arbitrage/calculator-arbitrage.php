<?php
/*-----------------------------------------------------------------------------------*/
/* Parlay
/*-----------------------------------------------------------------------------------*/
function add_stylesheet_arbitrage()
{
    echo "<!-- CUSTOM JS Parlay-->";
    echo "<link href='" . get_template_directory_uri() . "/calculator/arbitrage/arbitrage.css?v=4.4' rel='stylesheet' type='text/css'>";
    echo "<script defer  src='" . get_template_directory_uri() . "/calculator/arbitrage/arbitrage.js?v=4.4'></script>";
}

function calculator_function_arbitrage($atts = array())
{

    $content = '<div class="calc-section">
    <div class="row">
      <div class="col-md-5 col-sm-12">
        <div class="form-col">
          <div class="col-inner">

            <div class="bet-row">
                                              <div class="col-input-block arbitrage-bet-row" data-id="1">
              <label>Bet 1</label>
              <div class="input-odds"><input maxlength="10" class="form-input error-class" type="text" id="odds_1" placeholder="Please Enter Bet 1 Odds." onkeypress="return Validate(event)">
              </div>
            </div>
                                              <div class="col-input-block arbitrage-bet-row" data-id="2">
              <label>Bet 2</label>
              <div class="input-odds"><input maxlength="10" class="form-input error-class" type="text" id="odds_2" placeholder="Please Enter Bet 2 Odds." onkeypress="return Validate(event)">
              </div>
            </div>

            <div class="col-input-block more_rows arbitrage-bet-row" data-id="3">							<label>Bet 3</label>							<div class="input-odds"><input maxlength="10" class="form-input" type="text" id="odds_3" placeholder="Please Enter Bet 3 Odds" onkeypress="return Validate(event)">							</div>						</div><div class="col-input-block more_rows arbitrage-bet-row" data-id="4">							<label>Bet 4</label>							<div class="input-odds"><input maxlength="10" class="form-input" type="text" id="odds_4" placeholder="Please Enter Bet 4 Odds" onkeypress="return Validate(event)">							</div>						</div></div>
            <div class="col-input-block">
              <label>Stake</label>
              <div class="input-odds">
              <input class="form-input error-class" type="text" id="total_stake" placeholder="Please Enter Stake" onkeypress="return isNumberKey(event,$(this))">
              </div>
            </div>
          </div>
        </div>

      </div>



      <div class="col-md-7  col-sm-12 stake">
        <div class="form-col">
        <div class="row">
        <div class="col">
        <h5 class="odds-title title-desk">Stake </h5>
        <div class="stake-row">
                                          <h5 class="odds-title title-mob" id="stake_title_1">Stake Bet 1</h5>
        <div class="input-text"> <span class="text-input" id="stake_1">$0.00</span> </div>
                                          <h5 class="odds-title title-mob" id="stake_title_2">Stake Bet 2</h5>
        <div class="input-text"> <span class="text-input" id="stake_2">$0.00</span> </div>

        <h5 class="odds-title title-mob more_rows" id="stake_title_3">Stake Bet 3</h5><div class="input-text more_rows"> <span class="text-input" id="stake_3">$0.00 </span> </div><h5 class="odds-title title-mob more_rows" id="stake_title_4">Stake Bet 4</h5><div class="input-text more_rows"> <span class="text-input" id="stake_4">$0.00 </span> </div></div>
      </div>
      <div class="col">
        <h5 class="odds-title title-desk">Payout</h5>
        <div class="payout-row">
                                          <h5 class="odds-title title-mob" id="payout_title_1">Payout Bet 1</h5>
        <div class="input-text"> <span class="text-input" id="payout_1">$0.00</span> </div>
                                          <h5 class="odds-title title-mob" id="payout_title_2">Payout Bet 2</h5>
        <div class="input-text"> <span class="text-input" id="payout_2">$0.00</span> </div>
                                          <h5 class="odds-title title-mob more_rows" id="payout_title_3">Payout Bet 3</h5><div class="input-text more_rows"> <span class="text-input" id="payout_3">$0.00 </span> </div><h5 class="odds-title title-mob more_rows" id="payout_title_4">Payout Bet 4</h5><div class="input-text more_rows"> <span class="text-input" id="payout_4">$0.00 </span> </div></div>
      </div>
        </div>
        </div>
        <div class="odds-output">
          <ul>
            <li><samp>Total Payout:</samp> <span class="result-input" id="total_payout">$0.00</span></li>
            <li><samp>Total Profit:</samp> <span class="result-input" id="total_profit">$0.00</span> </li>
            <li><samp>ROI:</samp> <span class="result-input" id="roi">0.00</span></li>
          </ul>
        </div>
      </div>

      <div class="btn-odds">
      <a href="javascript:void(0);" class="btn " id="add_more">
      <i class="fa fa-plus-circle" aria-hidden="true"></i>More Bets</a>
      <a href="javascript:void(0);" class="btn btn-reset" id="reset">
      <i class="fa fa-refresh" aria-hidden="true"></i> Reset</a>
      <a href="javascript:void(0);" class="btn btn-white mr-3" id="submit_arbitrage">
      CALCULATE</a>
    </div>

    </div>
  </div>';
    return $content;
}

add_action('wp_head', 'add_stylesheet_arbitrage');
add_shortcode('calculatorArbitrage', 'calculator_function_arbitrage');
