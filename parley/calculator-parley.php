<?php
/*-----------------------------------------------------------------------------------*/
/* Parlay
/*-----------------------------------------------------------------------------------*/
function add_stylesheet_to_head()
{
    echo "<!-- CUSTOM JS Parlay-->";
    echo "<link href='" . get_template_directory_uri() . "/calculator/parley/calculator.css ' rel='stylesheet' type='text/css'>";
    echo "<script defer  src='" . get_template_directory_uri() . "/calculator/parley/calculcator.js '></script>";
}

function dotirating_function($atts = array())
{

    // // set up default parameters
    // extract(shortcode_atts(array(
    //     'rating' => '5',
    // ), $atts));

    $content = '<div class="calc-section">
    <div class="inputs-container">
    <!-- <div class="title"><strong>Parlay</strong> Calculator </div>-->
    <div id="games-input-list">
    <div class="input-field"><span id="txtLine_1_label">Game 1 Line:</span>
    <div class="input-row"><input id="txtLine_1" class="inputLine odds-value-input" autocomplete="off" type="text" value="0" /></div>
    </div>
    </div>
    <div class="input-field ">+ Add Row
    <div class="select-wrapper output-wrapper addArrow"><select id="selNumGames" class="odds-value-input odds-format-select" name="selNumGames">
    <option class="select-option" value="3">3</option>
    <option class="select-option" value="4">4</option>
    <option class="select-option" value="5">5</option>
    <option class="select-option" value="6">6</option>
    <option class="select-option" value="7">7</option>
    <option class="select-option" value="8">8</option>
    <option class="select-option" value="9">9</option>
    <option class="select-option" value="10">10</option>
    <option class="select-option" value="11">11</option>
    <option class="select-option" value="12">12</option>
    <option class="select-option" value="13">13</option>
    <option class="select-option" value="14">14</option>
    <option class="select-option" value="15">15</option>
    </select></div>
    </div>
    <div class="input-field">
    <div class="select-wrapper">Risk Amount($)</div>
    <input id="risk-amount" class="odds-value-input" autocomplete="off" type="text" value="0" /></div>

      <div class="btns">
      <button class="btn btn-light resetBtn mx-2" type="button">Reset</button>
      <input id="calculate-parlay-btn" class="mx-auton " type="button" value="Calculate" />
      <button class="btn btn-light infoBtn" type="button">How to use the Parlay Calculator</button>
      </div>
    </div>
    <div class="convertion-results-wrapper">&nbsp;</div>
    </div>';
    return $content;
}

add_action('wp_head', 'add_stylesheet_to_head');
add_shortcode('calculatorParley', 'dotirating_function');
