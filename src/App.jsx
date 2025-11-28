import React, { useState, useRef, useEffect } from 'react'
import Game from './game/Game';
import { BrowserRouter, data, Route, Routes } from 'react-router-dom';
import Statistics from './game/Statistics';
import Bet from './game/Bet';
import Result from './game/Result';
import Info from './game/Info';
import Footer from './game/bottom/Footer';
import Header from './game/top/Header';
import SplashScreen from './game/SplashScreen'; // ✅ Import splash screen

const App = () => {
  const [showSplash, setShowSplash] = useState(true); // ✅ Splash state
  const [balance, setBalance] = useState(10000);
  const [soundVolume, setSoundVolume] = useState(50);
  const soundRangeRef = useRef();
  const soundAudioRef = useRef(null);
  const winSoundRef = useRef(null);
  const coinSoundRef = useRef(null);
  const clickRef = useRef(null);
  const soundRef = useRef(null);
  const [acceptedBets, setAcceptedBets] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [history, setHistory] = useState([]);
  const [roundId, setRoundId] = useState(null);

  function setRealHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setRealHeight();
window.addEventListener("resize", setRealHeight);

  
  // Splash timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 6000); // 6 seconds splash
    return () => clearTimeout(timer);
  }, []);

  const handleSoundChange = (e) => {
    const volume = Number(e.target.value);
    setSoundVolume(volume);
    const normalized = volume / 100;
    [soundAudioRef, winSoundRef, clickRef, soundRef, coinSoundRef ].forEach(ref => {
      if (ref.current) {
        ref.current.volume = normalized;
      }
    });
  };

  const checkBets = (rand) => {
    let totalWin = 0;
    const id = Date.now();
    setRoundId(id);
    const now = new Date();
    const roundTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    const newHistory = acceptedBets.map(bet => {
      const { amount, payoutMultiplier, min, max, mode } = bet;
      let win = false;

      switch (mode) {
        case 'in': case 'range':
          win = rand >= min && rand <= max;
          break;
        case 'out':
          win = rand <= min || rand >= max;
          break;
        case 'under':
          win = rand >= 1 && rand <= max;
          break;
        case 'over':
          win = rand >= min && rand <= 100;
          break;
      }

      const result = win ? amount * payoutMultiplier : 0;
      totalWin += result;

      return {
        id: id,
        bet: `${min}-${max}`,
        amount: amount.toFixed(1),
        result: result.toFixed(2),
        time: roundTime
      };
    });

    setHistory(prev => [...newHistory, ...prev]);

    if (totalWin > 0) {
      setBalance(prev => prev + totalWin);
      setWinAmount(totalWin);
      setShowWinPopup(true);
      winSoundRef.current?.play();
      coinSoundRef.current?.play();
      setTimeout(() => setShowWinPopup(false), 3000);
    } else {
      console.log('please add bet');
    }

    setAcceptedBets([]);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="app-wrapper"> 
        <BrowserRouter>
          <Header
            handleSoundChange={handleSoundChange}
            soundRangeRef={soundRangeRef}
            balance={balance}
            soundVolume={soundVolume}
          />
           <div className="middle-content">
          <Routes>
            <Route path='/' element={
              <Game
                roundId={roundId}
                winAmount={winAmount}
                showWinPopup={showWinPopup}
                setAcceptedBets={setAcceptedBets}
                checkBets={checkBets}
                setBalance={setBalance}
                balance={balance}
                winSoundRef={winSoundRef}
                clickRef={clickRef}
                soundAudioRef={soundAudioRef}
                handleSoundChange={handleSoundChange}
                soundRangeRef={soundRangeRef}
                soundVolume={soundVolume}
                soundRef={soundRef}
                coinSoundRef={coinSoundRef}
              />} />
            <Route path='statistics' element={<Statistics />} />
            <Route path='bet' element={<Bet historyData={history} />} />
            <Route path='result' element={<Result />} />
            <Route path='info' element={<Info />} />
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
