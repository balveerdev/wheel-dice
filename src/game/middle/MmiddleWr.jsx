import React, { useState, useRef, useEffect} from 'react';
import '/src/App.css'
import InOut from './InOut';
import UnderOver from './UnderOver';
import Range from './Range';

const MmiddleWr = ({ showMessage, clickRef, balance, setBalance, setAcceptedBets, timer  }) => {
     const [betAmount, setBetAmount] = useState(0.1);

     const [activeTab, setActiveTab] = useState('inOut'); // default to InOut
    
   
const inOutTabRef = useRef();     // For tab button
const underOverTabRef = useRef(); // For tab button
const RangeTabRef = useRef(); // For tab button
const RangeContentRef = useRef(); // For tab button
const inOutContentRef = useRef(); // For tab content
const underContentRef = useRef(); // For tab content





const InOutTab = () => {
  setActiveTab('inOut');
};


const UnderOverTab = () => {
  setActiveTab('underOver'); 
};


const RangeTab = () => {
  setActiveTab('range'); 
};







const plusBtn = () => {
  if (betAmount < 100) {
    setBetAmount(prev => parseFloat((prev + 0.1).toFixed(1)));
  } else {
    showMessage("warning", "⚠️ Maximum bet 100 fun", "orange");
  }
};

const minusBtn = () => {
  if (betAmount > 0.1) {
    setBetAmount(prev => parseFloat((prev - 0.1).toFixed(1)));
  } else {
     showMessage("error", "❗ Minimum bet 0.1 fun", "red");
  }
};

const minmBtn = () => {
  if (betAmount > 0.1) {
    setBetAmount(0.1);
  } else {
     showMessage("error", "❗ Minimum bet 0.1 fun", "red");
  }
};

const halfBtn = () => {
  if (betAmount <= 0.1) {
    showMessage("error", "❗ Minimum bet 0.1 fun", "red");
    setBetAmount(0.1);
    return;
  }

  const half = parseFloat((betAmount / 2).toFixed(1));
  if (half >= 0.1) {
    setBetAmount(half);
  } else {
    setBetAmount(0.1);
    showMessage("error", "❗ Minimum bet 0.1 fun", "red");
  }
};

const multiplyBtn2 = () => {
  const doubled = parseFloat((betAmount * 2).toFixed(1));
  if (doubled <= 100) {
    setBetAmount(doubled);
  } else {
    setBetAmount(100);
    showMessage("warning", `⚠️ Maximum bet 100 fun`, "orange");
  }
};

const multiplyBtn3 = () => {
  const tripled = parseFloat((betAmount * 3).toFixed(1));
  if (tripled <= 100) {
    setBetAmount(tripled);
  } else {
    setBetAmount(100);
    showMessage("warning", `⚠️ Maximum bet 100 fun`, "orange");
  }
};


const handleBet = () => {
  const parsedAmount = parseFloat(betAmount);

  // Step 1: Check if betAmount is a valid number
  if (balance === 0) {
    showMessage("error", "❌ Invalid bet amount.", "rgb(223,18,18)");
    return;
  }

  let betValues;
  if (activeTab === 'inOut') {
    betValues = inOutTabRef.current?.getValues();
  } else if (activeTab === 'underOver') {
    betValues = underOverTabRef.current?.getValues();
  } else if (activeTab === 'range') {
    betValues = RangeTabRef.current?.getValues();
  }

  // Step 2: Check for sufficient balance
  if (balance < parsedAmount) {
    showMessage("error", "❗ Insufficient balance.", "rgb(223,18,18)");
    return;
  }

  const { mode, min, max, payoutMultiplier } = betValues;

  setAcceptedBets(prev => [
    ...prev,
    {
      mode,
      min,
      max,
      amount: parsedAmount,
      payoutMultiplier,
    }
  ]);

  // Step 3: Deduct balance and show success
  const newBalance = Number((balance - parsedAmount).toFixed(2));
  setBalance(newBalance);
  clickRef.current?.play();  // 🔊 Play bet sound
  showMessage("success", "✔ Your bet is accepted!", "#38e81b");
};





const [chance, setChance] = useState('--%');
const [odd, setOdd] = useState('x--');
const [payout, setPayout] = useState('-- fun');

const [isBadOdd, setIsBadOdd] = useState(false);
const [isDisabled, setIsDisabled] = useState(true);

useEffect(()=>{

  if (timer <= 7 && timer >= 2){
    setIsDisabled(false);
  }else if(timer <= 1){
    setIsDisabled(true)
  }
},[timer]);



  return (
    <div className='game-center'>
        <div className="game-center-bottom">
                            <div className="selection-block">
                                <div className="inner-selection-block">
                                    <div className="inner-selection-block-top">
                                        <div dir="ltr" className="tabs-wrapper-d">
                                            <div onClick={InOutTab} ref={inOutContentRef} className={`tab-item-d ${activeTab === 'inOut' ? 'active' : ''}`} data-tab="inOut">
                                                <p  className="tab-item-d-txt">In - Out</p>
                                            </div>
                                            <div onClick={UnderOverTab} ref={underContentRef} className={`tab-item-d ${activeTab === 'underOver' ? 'active' : ''}`} data-tab="underOver">
                                                <p className="tab-item-d-txt">UNDER - OVER</p>
                                            </div>
                                            <div onClick={RangeTab} ref={RangeContentRef} className={`tab-item-d ${activeTab === 'range' ? 'active' : ''}`} data-tab="range">
                                                <p className="tab-item-d-txt">Range </p>
                                            </div>
                                        </div>
                                       {activeTab === 'inOut' && (
                                        <InOut ref={inOutTabRef} betAmount={betAmount} setChance={setChance} setOdd={setOdd} setPayout={setPayout} setIsBadOdd={setIsBadOdd} />  )}
                                       {activeTab === 'underOver' && (
                                         <UnderOver ref={underOverTabRef} betAmount={betAmount} setChance={setChance} setOdd={setOdd} setPayout={setPayout} setIsBadOdd={setIsBadOdd} />  )}
                                       {activeTab === 'range' && (  
                                         <Range ref={RangeTabRef} betAmount={betAmount} setChance={setChance} setOdd={setOdd} setPayout={setPayout} setIsBadOdd={setIsBadOdd} /> )}

                                        </div>
                                       
                                        
                                     
                                        <div className="inner-selection-block-bottom">
                                            <div dir="ltr" className="info-block-selection-block">
                                                <div className="info-block-selection-block-item">
                                                  <p className="info-block-selection-block-item-txt">Chance:</p>
                                                  <p className="info-block-selection-block-item-numb">{chance}</p>
                                                </div>
                                                <div dir="ltr" className="info-block-selection-block-item">
                                                  <p className="info-block-selection-block-item-txt">Odd:</p>
                                                  <p className={`info-block-selection-block-item-numb ${isBadOdd ? 'red-odd blink-odd' : ''}`}>{odd}</p>
                                                </div>
                                                <div dir="ltr" className="info-block-selection-block-item strong">
                                                  <p className="info-block-selection-block-item-txt">Payout:</p>
                                                  <p className="info-block-selection-block-item-numb">{payout}</p>
                                                </div>
                                              </div>

                                        <div className="bet-bts-wr">
                                            <div className="bet-bts-wr-left">
                                                <div className="bet-bts-wr-left-inner ">
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={minusBtn} className=" minus-btn bet-bts-wr-left-item-btn"
                                                            type="button" fdprocessedid="klczz"><span
                                                                className="bet-bts-wr-left-item-btn-txt"><i
                                                                    className="ui-lib-minus"></i></span></button>
                                                    </div>
                                                  
                                                    <div className="bet-bts-wr-left-item">
                                                        <input type="number" maxLength={9} autoComplete="off"
                                                            readOnly title={betAmount} id="leftiteminp"
                                                            className="bet-bts-wr-left-item-inp" inputMode="none"
                                                            value={betAmount} fdprocessedid="yclubr" onChange={(e) => setBetAmount(e.target.value)}/>
                                                    </div>
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={plusBtn} className=" plus-btn bet-bts-wr-left-item-btn"
                                                            type="button" fdprocessedid="il0upp"><span
                                                                className="bet-bts-wr-left-item-btn-txt"><i
                                                                    className="ui-lib-plus"></i></span></button>
                                                    </div>
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={minmBtn} id="minBetBtn" type="button"
                                                            className="bet-bts-wr-left-item-btn "
                                                            fdprocessedid="uewxp"><span
                                                                className="bet-bts-wr-left-item-btn-txt">Min</span></button>
                                                    </div>
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={multiplyBtn3}  type="button"
                                                            className=" multiply3-btn bet-bts-wr-left-item-btn "
                                                            fdprocessedid="r91ln"><span
                                                                className="bet-bts-wr-left-item-btn-txt">x3</span></button>
                                                    </div>
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={halfBtn} id="halfBetBtn" type="button"
                                                            className="bet-bts-wr-left-item-btn "
                                                            fdprocessedid="7n0v4u"><span
                                                                className="bet-bts-wr-left-item-btn-txt">1/2</span></button>
                                                    </div>
                                                    <div className="bet-bts-wr-left-item">
                                                        <button onClick={multiplyBtn2}  type="button"
                                                            className=" multiply2-btn bet-bts-wr-left-item-btn "
                                                            fdprocessedid="7xi1s"><span
                                                                className="bet-bts-wr-left-item-btn-txt">x2</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bet-bts-wr-right">
                                                <button onClick={handleBet} className={`bet-btn-d pulsation ${isDisabled ? 'betdisabled' : 'active'}`} id="betbtnd" type="button" disabled={isDisabled}
                                                    fdprocessedid="hu9h1e"><span className="bet-btn-d-txt"
                                                        title="Bet">Bet</span><span
                                                        className="bet-btn-d-small-txt"></span></button>
                                            </div>
                                            <audio
                                                 ref={clickRef}
                                                 src="/sound/your_bet_is_accepted.mp3"
                                                 preload="auto"
                                                style={{ display: 'none' }}
                                                />
                                        </div>
                                      
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                     </div>
    
  );
}

export default MmiddleWr;