import React, { useState } from 'react';

const AboutTab = () => (
  <div class="result-content-b">
     <div class="fs-help-popup-text">
       <p style={{ marginTop: "10px", fontWeight: "bold", backgroundColor: '#4ec307', color: 'red', padding:'5px' }}>
 <strong>⚠ Note:</strong> This game uses only virtual fun coins. No real money, deposits or withdrawals are involved.
</p>
         <p>"Dice" is a constantly ongoing game which players can join at any moment. To participate in the game, the player must choose from the offered outcomes (options) and make a participation fee within the amount offered
             by the Organizer. During each round, a certain amount of time is given to make the participation fee. After making the participation fee, any number within the range of 1 to 100 is opened.</p>
         <p>In "Dice", it is possible to make a participation fee on the following outcomes:</p>
         <p>1. The number to be opened will be within the range of the two chosen numbers or out of that range.</p>
         <p>For example, the Player chooses a range of 20 to 55* and determines that the number to be opened will be within that range. If a number within the range of the two numbers chosen by him is opened, i.e. is over (or
             equal to) 20 and is under (or equal to) 55, the Player wins, and if a number that is under 20 or over 55 is open the Player loses.</p>
         <p>2. The number to be opened will be over/equal or under/equal to the chosen number</p>
         <p>For example the Player chooses the number 15 and determines "Over" for it. If 15 or a number over 15 is opened, the Player wins, and if a number under 15 is opened, the Player loses.</p>
         <p>3.The number to be opened will be within several chosen ranges or the number to be opened will be one of the chosen numbers or the number to be opened will be the specific chosen number.</p>
         <p>For example, the Player chooses 10, 25, 55, 70 and the number opened corresponds to one of the chosen numbers, the Player wins, and if the number opened does not correspond to one of the aforementioned numbers,
             the Player loses.</p>
         <p>The win amount is calculated by down to the nearest hundred. Example:0.218-&gt;0.21</p>
     </div>
     <div class="fs-help-popup-text">
         <p>The odds are formed depending on the outcome chosen by the Player and are displayed to the Players. As the probability of winning increases or decreases, the odds decrease and increase accordinaly</p>
         <p>The payout is calculated by multiplying the Player's participation fee by the corresponding odds of the correctly guessed outcome. In case of a wrong guess, the Player loses.</p>
         <p>The win amount is calculated by down to the nearest hundred. Example:0.218-&gt;0.21</p>
         <p>The number to be opened is not determined at during the game, but in advance, 5 games before. After the end of the game the Players are given a password. If the Players enter it in the corresponding program, they
             can make sure that the number opened was decided in advance and not during the game.</p>
         <p>The odds are formed depending on the outcome chosen by the Player and are displayed to the Players. As the probability of winning increases or decreases, the odds decrease and increase accordinaly</p>
         <p>The payout is calculated by multiplying the Player's participation fee by the corresponding odds of the correctly guessed outcome. In case of a wrong guess, the Player loses.</p>
         <p>The number to be opened is not determined at during the game, but in advance, 5 games before. After the end of the game the Players are given a password. If the Players enter it in the corresponding program, they
             can make sure that the number opened was decided in advance and not during the game.</p>
         <p>In case of cancellation, the bet is refunded automatically.
             <br/>In case of malfunction/errors, the win is awarded automatically.</p>
         <p>RTP-96%</p>
     </div>
 </div>
);

const FairnessTab = () => (
  <div className="fs-help-popup-text">
    <p style={{ marginTop: "10px", fontWeight: "bold", backgroundColor: '#4ec307', color: 'red', padding:'5px' }}>
 <strong>⚠ Note:</strong> This game uses only virtual fun coins. No real money, deposits or withdrawals are involved.
</p>
    <p>
      Before the start of the round, players are given a <strong>"Hash Code *"</strong> — a coded text combination. 
      "Hash Code *" contains the number that will represent the game result. That is, the number which will be the 
      game result is decided not during the game, but in advance, for 5 rounds, and is given to the Players in 
      encrypted form. For example: 
    </p>
    <p>
      <code>8860731B4F9523DD3A1AA686A237BB89CC5EC01448ADFFE6FFE64F12E3015C648904D3761689EA0B642B8E0A8A250ADA0773247B792541B2EE4FD89EFFA3283B</code>
    </p>

    <p>
      After the end of the round, the players are given a <strong>"Key*"</strong> and an extra entry parameter — <strong>"Salt*"</strong> 
      to get a <strong>"Hash Code*"</strong>. With their help, each player can duplicate and encrypt this combination to make sure the 
      encrypted <strong>"Key*"</strong> matches the <strong>"Hash Code*"</strong> given by the system in advance. This latest technology proves 
      the honesty of the game, assuring players that the result is determined not during the game, but in advance.
    </p>

    <p><strong>What is ‘Salt*’?</strong> It is a random letter-number sequence. For example: <code>C6Ehqw1M5EvuiDA9yJ0t8A</code></p>

    <p><strong>What is the "Key *"?</strong> It is a text combination of four parameters:</p>
    <ul >
      <li style={{fontSize:"14px", listStyle :'number'}}>Round ID</li>
      <li style={{fontSize:"14px", listStyle :'number'}}>The number which will be the game result</li>
      <li style={{fontSize:"14px", listStyle :'number'}}>The word <strong>"Dice"</strong></li>
      <li style={{fontSize:"14px", listStyle :'number'}}>A random letter-number sequence</li>
    </ul>

    <p>
      After the end of the game, by clicking the “Check” button of the given round in the “Results” section, the player will see the 
      “Key” as follows:
    </p>
    <p>
      Round ID (e.g., <code>2177486</code>); the number which will be the result (e.g., <code>26</code>); the word <code>Dice</code> and a 
      random sequence — <code>88be4c30-f465-493f-9151-4242b8a80628</code>.
    </p>
    <p>
      In this case, the full <strong>Key*</strong> will be:<br />
      <code>2177486_26_Dice_88be4c30-f465-493f-9151-4242b8a80628</code>
    </p>

    <p>
      If you encrypt the <strong>Key*</strong> with <strong>Salt*</strong> (e.g., <code>e0ea46bee8</code>) using a SHA512 generator, you’ll get 
      the following <strong>Hash Code*</strong>:
    </p>
    <p>
      <code>8860731B4F9523DD3A1AA686A237BB89CC5EC01448ADFFE6FFE64F12E3015C648904D3761689EA0B642B8E0A8A250ADA0773247B792541B2EE4FD89EFFA3283B</code>
    </p>

    <p>
      To get a <strong>Hash Code*</strong>, click “Check” in the “Results” section or use any SHA512 with Salt generator online.
    </p>

    {/* Original fairness text */}
    <p>The odds are formed depending on the outcome chosen by the Player and are displayed to the Players. As the probability of winning increases or decreases, the odds decrease and increase accordingly.</p>
    <p>The payout is calculated by multiplying the Player's participation fee by the corresponding odds of the correctly guessed outcome. In case of a wrong guess, the Player loses.</p>
    <p>The win amount is calculated by down to the nearest hundred. Example: 0.218 → 0.21</p>
    <p>The number to be opened is not determined during the game, but in advance, 5 games before. After the end of the game the Players are given a password. If the Players enter it in the corresponding program, they can verify that the number was decided beforehand.</p>
    <p>In case of cancellation, the bet is refunded automatically.<br />In case of malfunction/errors, the win is awarded automatically.</p>
    
  </div>
);


const Info = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="middle-mobile-wrinf">
      <div className="core-popup-wr is-small from-left">
        <div dir="ltr" className="core-popup-wr-inner is-mobile">
          <div className="core-popup-inner-left">
            <div className="core-popup-inner-left-inner">
              <div className="core-popup-inner-left-inside">
                <div className="core-popup-inner-left-tab-wrp">
                  <div
                    className={`core-popup-inner-left-tab-item ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    <p className="core-popup-inner-left-tab-txt is-mobile">About</p>
                    <span className="core-popup-inner-left-tab-active" />
                  </div>
                  <div
                    className={`core-popup-inner-left-tab-item ${activeTab === 'fairness' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fairness')}
                  >
                    <p className="core-popup-inner-left-tab-txt is-mobile">Fairness</p>
                    <span className="core-popup-inner-left-tab-active" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="core-popup-inner-right">
            <div className="core-popup-inner-right-content">
              <div className="top-core-popup-wr-inner">
                <div className="top-core-popup-wr-inner-row is-mobile">
                  <p className="top-core-popup-wr-inner-row-txt">Info</p>
                </div>
              </div>
              <div className="bottom-core-popup-wr-inner">
                <div className="bottom-core-popup-content">
                  <div className="scrollable-container">
                    <div className="bottom-core-popup-content-block">
                      <div className="result-content-b">
                        {activeTab === 'about' ? <AboutTab /> : <FairnessTab />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
