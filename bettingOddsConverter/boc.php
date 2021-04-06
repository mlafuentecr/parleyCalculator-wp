<?php
/*-----------------------------------------------------------------------------------*/
/* Parlay
/*-----------------------------------------------------------------------------------*/
function boc_stylesheet()
{
    echo "<!-- CUSTOM JS Parlay-->";
    echo "<link href='" . get_template_directory_uri() . "/calculator/bettingOddsConverter/boc.css?v=4' rel='stylesheet' type='text/css'>";
    echo "<script defer  src='" . get_template_directory_uri() . "/calculator/bettingOddsConverter/boc.js?v=4'></script>";
}

function boc_function()
{

    $content = '<div id="mainContainer" class="calc-section px-4 covers-Container-main col-md-12 col-xs-12">


        <div class="row">
            <div class="covers-CoversHTB-oddsCalc">

                <form method="get" action="" onsubmit="return(false);">
                    <div class="oddsCalculator">
                        <div class="covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12">
                                <label for="bet">
                                    <b>Bet/Wager Amount</b>
                                    <div class="poppover popover--active">
                                        <button class="popover__trigger">?</button>
                                        <ul class="popover__menu">
                                            <li class="popover__menu-item">Enter the amount of money you plan to wager.</li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <input type="text" id="HTB_placeHolder" name="bet" placeholder="eg 110" onblur="oddsConverter(this);">
                            </div>
                        </div>
                        <div class="covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12">
                                <label for="us-odds">
                                    <b>American Odds</b>
                                    <div class="poppover">
                                        <button class="popover__trigger">?</button>
                                        <ul class="popover__menu">
                                            <li class="popover__menu-item">American odds are displayed in hundreds and thousands (-110, +500, +1500, etc). Be sure to enter the minus sign (-) if applicable to your odds. </li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <input id="HTB_placeHolder" placeholder="eg -110" type="text" name="us_odds" onblur="oddsConverter(this);">
                            </div>
                        </div>
                        <div class="covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12">
                                <label for="decimal-odds">
                                    <b>Decimal Odds</b>
                                    <div class="poppover">
                                        <button class="popover__trigger">?</button>
                                        <ul class="popover__menu">
                                            <li class="popover__menu-item">American odds are displayed in hundreds and thousands (-110, +500, +1500, etc). Be sure to enter the minus sign (-) if applicable to your odds. </li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <input id="HTB_placeHolder" placeholder="eg 1.91" type="text" name="decimal_odds" onblur="oddsConverter(this);">
                            </div>
                        </div>
                        <div class="covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12">
                                <label for="fractional-odds">
                                    <b>Fractional Odds</b>
                                    <div class="poppover">
                                        <button class="popover__trigger">?</button>
                                        <ul class="popover__menu">
                                            <li class="popover__menu-item">Fractional odds are displayed as a fraction (1/2 , 10/11, 12/1, etc).</li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <input id="HTB_placeHolder" placeholder="eg 10/11" type="text" name="fractional_odds" onblur="oddsConverter(this);">
                            </div>
                        </div>
                        <div class="covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12">
                                <label for="implied-probability"><b>Implied Probability:</b>
                                <div class="poppover">
                                        <button class="popover__trigger">?</button>
                                        <ul class="popover__menu">
                                            <li class="popover__menu-item">Implied probability is displayed as a percentage (10%, 52.38%, 83.33%, etc).</li>
                                        </ul>
                                    </div>
                                </label>
                            </div>
                            <div class="col-xs-12 col-sm-12">
                                <input id="HTB_placeHolder" placeholder="eg 40%" type="text" name="implied_probability" onblur="oddsConverter(this);">
                            </div>
                        </div>

                        <div style="padding-bottom:5px" class="profit covers-CoversHTB-OddsCalcRow">
                            <div class="col-xs-12 col-sm-12">
                                <div class="covers-calculators-payoutBlock">
                                <div class="row">
                                    <div class="col-xs-12 mx-auto"">
                                        <label><b>Profit</b></label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 mx-auto"">
                                        <input type="text" id="payout" name="payout" onblur="oddsConverter(this);">
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="covers-CoversHTB-OddsCalcRow" style="width:100%;float:left;margin-top:5px">
                            <div class="covers-CoversHTB-OddsCalcSubmit col-xs-12 col-sm-12">

                                <input class="covers-Calculators-resetBtn" onclick="clearForm(this.form)" type="button" value="Reset" name="button">
                                <input class="covers-Calculators-calculateBtn" onclick="" type="button" value="Submit" name="button">
                                </div>
                        </div>
                    </div>
                </form>
            </div>




        </div>


    </div>';
    return $content;
}

add_action('wp_head', 'boc_stylesheet');
add_shortcode('boc', 'boc_function');
