import React, {useState, useRef} from 'react'
import MmiddleWr from '../game/middle/MmiddleWr';
import TopMiddleWr from '../game/middle/TopMiddleWr';

const Game = ({roundId, balance, setBalance, soundRef, soundVolume, soundRangeRef, handleSoundChange, winSoundRef, clickRef, soundAudioRef,  winAmount, showWinPopup, setAcceptedBets, checkBets, coinSoundRef}) => {
   const [messages, setMessages] = useState([]);
    const messageIdRef = useRef(0);
  
    const showMessage = (type, text, color) => {
      const id = messageIdRef.current++;
      const newMsg = { id, type, text, color };
      setMessages((prev) => [...prev, newMsg]);
  
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }, 2000);
    };
  
  
   
  
     const [timer, setTimer] = useState(7);
  
  
  
  
    return (
      <>
      
      
      <TopMiddleWr roundId={roundId} winSoundRef={winSoundRef} coinSoundRef={coinSoundRef} timer={timer} setTimer={setTimer} showWinPopup={showWinPopup} winAmount={winAmount} messages={messages} soundAudioRef={soundAudioRef} soundRef={soundRef} checkBets={checkBets} />
      <MmiddleWr clickRef={clickRef} timer={timer}  balance={balance} setBalance={setBalance}  showMessage={showMessage} setAcceptedBets={setAcceptedBets} />
     
  
       {/* Audios */}
          <audio
            ref={soundAudioRef}
            src="/sound/stone_rotate.mp3"
            preload="auto"
            style={{ display: 'none' }}  /> 
  
          <audio
            ref={winSoundRef}
            src="/sound/you_won.mp3"
            preload="auto"
           style={{ display: 'none' }}
           />
          
          <audio
            ref={clickRef} 
            src="/sound/your_bet_is_accepted.mp3" 
            preload="auto" 
            style={{ display: 'none' }} />
  
          <audio 
            ref={coinSoundRef} 
            src="/sound/coin.mp3" 
            preload="auto" 
            style={{ display: 'none' }}/>

          <audio
            ref={soundRef}
            src="/sound/stone_finished.mp3"
            preload="auto"
            style={{ display: 'none' }}/>
      </>
    )
}

export default Game;