import React, { useEffect, useState, useRef } from 'react';
import '/src/App.css';

const TopMiddleWr = ({ messages = [],timer, setTimer, coinSoundRef, soundAudioRef, checkBets, winAmount, showWinPopup, winSoundRef, roundId, soundRef}) => {
 
  const [phase, setPhase] = useState('countdown');
  const [randomNumber, setRandomNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [latestIndex, setLatestIndex] = useState(null);
  const [flyNumber, setFlyNumber] = useState(null);
 const [circleAnimating, setCircleAnimating] = useState(false);
 const animaTimeb = useRef(null);
const animaTimem = useRef(null);
const animaTionClo = useRef(null);
const animaTionCloc = useRef(null);
const [diceAnimKey, setDiceAnimKey] = useState(0);
const diceSprite = useRef(null);
const [animateSmallCircle, setAnimateSmallCircle] = useState(false);
const closetitel = useRef(null);



useEffect(() => {
  if (phase === 'number') {
    setDiceAnimKey(prev => prev + 1);
  }
}, [phase, randomNumber]);


const renderDisplay = () => {
  if (phase === 'go') return 'GO';
  if (phase === 'number') return randomNumber;
  return timer; // countdown
};



  // Countdown phase
  useEffect(() => {
    if (phase !== 'countdown') return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setPhase('go');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [phase]);

  // GO phase: Wait 1s then show number
  useEffect(() => {
    if (phase !== 'go') return;

   const goTimeout = setTimeout(() => {
  const rand = Math.floor(Math.random() * 100) + 1;
  setRandomNumber(rand);   // ✅ App.jsx ke state me set karo
  checkBets(rand);         // ✅ Win/Loss logic trigger karo
  setPhase('number');
}, 2500);


    return () => clearTimeout(goTimeout);
  }, [phase]);

  // NUMBER phase: Show number → fly animation → add to history
  useEffect(() => {
    if (phase !== 'number') return;

    const flyTimeout = setTimeout(() => {
      setFlyNumber(randomNumber); // Start flying animation
    }, 800); // Delay 0.5s before flying

    const resetTimeout = setTimeout(() => {
      setHistory((prev) => {
        const updated = [...prev.slice(-9), randomNumber];
        setLatestIndex(updated.length - 1);
        return updated;
      });

      setFlyNumber(null);
      setRandomNumber(null);
      setTimer(7);
      setPhase('countdown');
    }, 3000); // Full number display time

    return () => {
      clearTimeout(flyTimeout);
      clearTimeout(resetTimeout);
    };
  }, [phase, randomNumber]);


  const getBetStatus = () => {
  if (phase === 'go') return 'Bets are closed';
  if (phase === 'number') return 'Bets are closed';
  if (timer > 3) return 'Place your bets';
  if (timer <= 3) return 'Bets are closing';
  return 'Place your bets';
};

useEffect(() => {
  if (phase === 'countdown' && timer === 3) {
    setAnimateSmallCircle(true);
  }
}, [timer, phase]);


useEffect(() => {
  if (phase === 'number') {
    setAnimateSmallCircle(false);
  }
}, [phase]);

useEffect(() => {
  if (animaTimeb.current) {
    animaTimeb.current.style.opacity = timer > 4 ? '0.9' : '0';
  }

  if (animaTimem.current) {
    animaTimem.current.style.opacity = timer > 1 ? '0.9' : '0';
  }

  if (soundRef.current && timer === 4 || timer === 1) {
    soundRef.current.currentTime = 0; // rewind to start
    soundRef.current.play().catch((e) => {
      console.warn("Sound play failed:", e);
    });
  }
}, [timer]);

// useEffect(() => {
//   if (animaTionClo.current) {
//     animaTionClo.current.style.animation="close-circle 5s linear forwards";
//   }

//    if (animaTionCloc.current) {
//      animaTionCloc.current.style.animation="close-circle 3s linear 4s forwards";
//    }
// }, [timer]);


 useEffect(() => {
  if (phase === 'go' && soundAudioRef?.current) {
    const audio = soundAudioRef.current;
    if (audio.volume > 0) {
      try {
        audio.pause();           // Reset if already playing
        audio.currentTime = 0;   // Rewind to start
         audio.play().catch(() => {
         console.warn('Autoplay blocked on GO phase');
        });
      } catch (err) {
        console.error('Sound playback error:', err);
      }
    }
  }
}, [phase]);

useEffect(() => {
  if (phase === 'go') {
    setCircleAnimating(true);

    // Stop animation class after animation ends (2.5s)
    const timeout = setTimeout(() => {
      setCircleAnimating(false);
    }, 2600); // a bit more than animation duration

    return () => clearTimeout(timeout);
  } else {
    setCircleAnimating(false); // Remove instantly on any other phase
  }
}, [phase]);

 useEffect(()=>{
 
  if(timer === 7 && diceSprite.current){

    const el = diceSprite.current;
    el.classList.remove("img-animation");
  void el.offsetWidth;
  el.classList.add("img-animation");
  }

 },[timer]);

 useEffect(()=>{

  if(phase === 'number' && closetitel.current){

    const el = closetitel.current;
    el.classList.remove("d-block");
  void el.offsetWidth;
  el.classList.add("d-none");
  }else{
    const el = closetitel.current;
    el.classList.remove("d-none");
  void el.offsetWidth;
  el.classList.add("d-block");
  }

 },[phase]);

// function setRealHeight() {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// }
// setRealHeight();
// window.addEventListener("resize", setRealHeight);


  return (
        <div className="middle-mobile-wr">
                        <div className="mobile-game_wrapper ">
                            <div className="game-center-wr">
         <div className="game-center-top">
                            <div ref={closetitel} dir="ltr" className="bets-info-block d-block ">
                                <p id="betsinfoblock" className="bets-info-block-txt" title={getBetStatus()}>{getBetStatus()}</p>
                            </div>
                            <div className="dice-game-wrp">
                                <div className="dice-g-header">
                                    <div className="dice-g-h-ins">
                                        <div className="dice-g-h-inner">
                                            <div className="dice-g-h-b">
                                                <div className="int-holder">
                                                    <div className="dice-number-wrp">
                                                        {[...history].reverse().map((num, i) => (
                                                        <div key={i} id="dicenumber" className={`dice-number-item ${i === latestIndex ? 'new' : ''}`}>{num}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                   <p className='mainNote' style={{fontSize:'8px', backgroundColor: 'transparent', color: 'red', padding:'5px', zIndex:'99999' }}>
                                                    <strong>⚠ Note:</strong> This game uses only virtual fun coins. No real money, deposits or withdrawals are involved.
                                                   </p>
                                  <div style={{
                                               position: 'absolute',
                                               top: '20px',
                                               right: '10%',
                                               display: 'flex',
                                               flexDirection: 'column',
                                               alignItems: 'flex-end',
                                               zIndex: 9999,
                                               gap: '6px' 
                                             }}>
                                               {messages.map((msg) => (
                                                 <div
                                                   key={msg.id}
                                                   className="bet-msg"
                                                   style={{
                                                     display: 'flex',
                                                     alignItems: 'center',
                                                     color: msg.color,
                                                     fontSize: '12px',
                                                     border: `1px solid ${msg.color}`,
                                                     padding: '4px 8px',
                                                     borderRadius: '4px',
                                                     background: '#1a1a1a',
                                                     zIndex: 1000,
                                                     // ❌ DON'T use marginTop here
                                                   }}
                                                 >
                                                   <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '6px' }}></i>
                                                   {msg.text}
                                                 </div>
                                               ))}
                                             </div>
                                <div className="dice-g-content">
                                    <div dir="ltr" className="id-info-wr">
                                        <p  className="id-info-txt" title="ID:">ID:</p>
                                        <p  className="id-info-number" title={roundId}>{roundId}</p>
                                    </div>
                                    <div className="game-dice-top-holder">
                                        <div className="game-dice-top-ins">
                                            <div className="game-dice-top-inner">
                                                <div className="img-wrp">
                                                    <img className="g-ratio" src="/images/game-spin-img.png"/>
                                                   <div dir="rtl" className={`g-d-img-resp ${circleAnimating ? 'rotate-circle' : ''}`}>

                                                     
                                                        <div className="circle-big">
                                                            <div id="circlebig" dir="rtl" className="circle-big-inside">
                                                                <div dir="rtl" ref={animaTionClo}  className="circleAfter circle-big-inside_after" 
                                                                    style={{animationDelay: '0s', animationDuration: '7s'}}>
                                                                </div>
                                                                <div id="biginsbl" ref={animaTimeb} className="circle-big-ins-bl"  style={{animationDelay: '3.5s'}}></div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="circle-m">
                                                            <div id="circlem"  ref={animaTionCloc} className="circle-m-inside">
                                                                <div id="minsbl"  ref={animaTimem} className="circle-m-ins-bl" style={{animationDelay: '6s'}}></div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="circle-small">
                                                             <div className="circle-sm-loader">
                                                               <div ref={diceSprite}
                                                                 id="smallinside"
                                                                 className="circle-small-inside img-animation"
                                                                 style={{ animationDelay: '4s' }}
                                                               >
                                                                 <div className="circle-small-number-wrp">
                                                                   <div id="dice-container">
                                                                     {/* Countdown: NO animation, NO white color */}
                                                                     {phase === 'countdown' && (
                                                                   <div id="timerclock" className="dice-timer">
                                                                   {renderDisplay()}
                                                                   </div>
                                                                     )}

                                                                {phase === 'go' && (
                                                                  <div
                                                                    id="timerclock"
                                                                    className="dice-timer go-text"
                                                                    key={`go-${diceAnimKey}`}
                                                                  >
                                                                    GO
                                                                  </div>
                                                                )}

                                                                {phase === 'number' && (
                                                                  <div
                                                                    id="timerclock"
                                                                    className="dice-timer dice-animate white-number"
                                                                    key={`num-${diceAnimKey}`}
                                                                  >
                                                                    {renderDisplay()}
                                                                  </div>
                                                                )}


                                                                  {/* Optional - unused tag */}
                                                                  <p className="circle-sml-nmb scale-number" id="timer"></p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>


                                                         <audio
                                                             ref={soundAudioRef}
                                                             src="/sound/stone_rotate.mp3"
                                                             preload="auto"
                                                             style={{ display: 'none' }}
                                                           />
                                                         <audio
                                                             ref={soundRef}
                                                             src="/sound/stone_finished.mp3"
                                                             preload="auto"
                                                             style={{ display: 'none' }}
                                                           />
                                                    </div>
                                                   
                                                </div>
                                                 
                                            </div>
                                        </div>
                                         {/* Flying number animation */}
                                          {flyNumber !== null && (
                                            <div className="flying-number">{flyNumber}</div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            {showWinPopup && (
                                     <div className="pop-you-win-wrp d-block">
                                       <div className="pop-you-win-holder">
                                         <p className="pop-you-text">Win</p>
                                         <p className="pop-you-money">{winAmount.toFixed(2)} fun</p>
                                       </div>
                                     </div>
                                   )}

                        </div>
                         </div>
                         <audio 
                         ref={winSoundRef} 
                         src="/sound/you_won.mp3" 
                         preload="auto" 
                         style={{ display: 'none' }}/>
                         <audio 
                         ref={coinSoundRef} 
                         src="/sound/coin.mp3" 
                         preload="auto" 
                         style={{ display: 'none' }}/>
    </div>
    </div>

  )
}

export default TopMiddleWr;