import React, {useImperativeHandle, useState, useEffect, useRef,  forwardRef } from 'react';
import '/src/App.css'

const UnderOver =  forwardRef (({betAmount, setChance, setOdd, setPayout , setIsBadOdd}, ref) => {

    const [sliderval1, setSliderVal1] = useState(null);
    const [sliderval2, setSliderVal2] = useState(null);

    const [activeThumb, setActiveThumb] = useState(null);
    const [activeThumbout, setActiveThumbout] = useState(null);

    const useUnder = useRef();
    const useOver = useRef();

    const underBtnRef = useRef();
    const overBtnRef = useRef();

     const [mode, setMode] = useState('under'); // 'under' or 'over'

    
    const handleUnderBtn = () => {
       setMode('under');
       useUnder.current.style.display ="block";
       useOver.current.style.display ="none";
       underBtnRef.current.classList.add("optdw");
       underBtnRef.current.classList.remove("optup");
       overBtnRef.current.classList.add("optup");
       overBtnRef.current.classList.remove("optdw");
    }
    const handleOverBtn = () => {
       setMode('over');
      useOver.current.style.display ="block";
      useUnder.current.style.display ="none";
      underBtnRef.current.classList.add("optup");
      underBtnRef.current.classList.remove("optdw");
      overBtnRef.current.classList.add("optdw");
      overBtnRef.current.classList.remove("optup");
    }


     useEffect(() => {
          if (activeThumb === null && sliderval1 > 95) {
            const timeout = setTimeout(() => {
              setSliderVal1(95); // snap back to 95
            }, ); // delay for smoother snap
        
            return () => clearTimeout(timeout);
          }
        }, [activeThumb, sliderval1]);

     useEffect(() => {
          if (activeThumbout === null && sliderval2 < 6) {
            const timeout = setTimeout(() => {
              setSliderVal2(6); // snap back to 95
            }, ); // delay for smoother snap
        
            return () => clearTimeout(timeout);
          }
        }, [activeThumbout, sliderval2]);


       useEffect(() => {
  const bet = parseFloat(betAmount);

  if (mode === 'under') {
    const max = sliderval1 ?? 25;
    const min = 1; // under mode me min hamesha 1

    const rangeCount = max - min + 1;
    if (isNaN(rangeCount) || rangeCount <= 0 || isNaN(bet)) {
      setChance('--%');
      setOdd('x--');
      setPayout('-- fun');
    } else {
      const oddValue = 96 / rangeCount;
      const payoutValue = bet * oddValue;
      setChance(`${rangeCount}%`);
      setOdd(`x${oddValue.toFixed(2)}`);
      setPayout(`${payoutValue.toFixed(2)} fun`);

      // 👇 Add red-odd condition
      if (max > 95) {
        setIsBadOdd(true);
      } else {
        setIsBadOdd(false);
      }
    }
  } else if (mode === 'over') {
    const min = sliderval2 ?? 55;
    const max = 100;

    //const leftRange = min;
    const rightRange = max - min ;

    const totalOutRange = rightRange; // user ne kaha hai 100 - val toh yahi hai

    if (isNaN(bet) || totalOutRange <= 0) {
      setChance('--%');
      setOdd('x--');
      setPayout('-- fun');
    } else {
      const oddValue = 96 / totalOutRange;
      const payoutValue = bet * oddValue;
      setChance(`${totalOutRange}%`);
      setOdd(`x${oddValue.toFixed(2)}`);
      setPayout(`${payoutValue.toFixed(2)} fun`);

       // 👇 Add red-odd condition
      if (min < 6) {
        setIsBadOdd(true);
      } else {
        setIsBadOdd(false);
      }
    }
  }
}, [mode, sliderval1, sliderval2, betAmount]);


const [payoutMultiplier, setPayoutMultiplier] = useState(2); // Default payout

  // This can be updated based on slider/input logic
  const updatePayout = (amount, payout) => {
    const mult = payout && amount ? payout / amount : 0;
    setPayoutMultiplier(parseFloat(mult.toFixed(2)));
  };

  // Example usage of updatePayout (call this when sliders change)
  const handleSliderChange = (val1, val2) => {
    setSliderval1(val1);
    setSliderval2(val2);

    const winChance = mode === 'under' ? val1 : 100 - val2 + 1;
    const payout = (100 / winChance) * betAmount;
    updatePayout(betAmount, payout);
  };

  // Expose values to parent
  useImperativeHandle(ref, () => ({
    getValues: () => {
      let min = 0;
      let max = 0;

      if (mode === 'under') {
        min = 1;
        max = sliderval1;
      } else {
        min = sliderval2;
        max = 100;
      }

      console.log("Mode:", mode, "Min:", min, "Max:", max, "Payout:", payoutMultiplier);

      return {
        mode,
        min,
        max,
        payoutMultiplier,
      };
    },
  }));

  return (
    <div ref={ref} className="tab-content active">
          <div  className="inner-selection-tab-content " id="underOver"> 
                                            <div className="input-range-wrp-holder">
                                                <div className="input-range-wrp">
                                                    <div className="input-range-holder is-mobile">
                                                        <div dir="ltr" className="inp-range-inside">
                                                            <div className="inp-range-row-item">
                                                                <div  className="inp-range-ins-item" data-percet="1"></div>
                                                                <div className="inp-range-ins-item" data-percet="10"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="20"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="30"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="40"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="50"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="60"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="70"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="80"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div className="inp-range-ins-item" data-percet="90"></div>
                                                                <div className="inp-range-ins-item" data-percet=""></div>
                                                                <div  className="inp-range-ins-item" data-percet="100"></div>
                                                            </div>
                                                               {/* Slider Section 1 */}
                                                              <div ref={useUnder} className="rangecl-sec d-block">
                                                                 <div className="price-input">
                                                                    <div className="range-number">
                                                                    <p className="p-number">1 - {sliderval1 ?? 25}</p>
                                                                </div>
                                                                  </div>
                                                        
                                                                <div className="sliderbar-sec">
                                                                  <div id="rangeInputBarSec" className="range-inputbar-sec">
                                                                    <input
                                                                      type="range"
                                                                      className={`range-min-cl ${activeThumb === 'min' ? 'active-thumb' : ''} ${sliderval1 > 95 ? 'highlight-thumb' : ''}`}
                                                                      id="slider5"
                                                                      min={1}
                                                                    max={100}
                                                                    value={sliderval1 ?? 25}
                                                                    onChange={(e) => setSliderVal1(Number(e.target.value))}
                                                                    step={1}

                                                                     onMouseDown={() => setActiveThumb('min')}
                                                                      onMouseUp={() => setActiveThumb(null)}
                                                                      onTouchStart={() => setActiveThumb('min')}
                                                                      onTouchEnd={() => setActiveThumb(null)}
                                                                  />
                                                                  <div id="progressclbar" className={`progress-cl-bar ${sliderval1 > 95 ? 'red-progress' : ''}`} style={{
                                                                                 width: `${((sliderval1 ?? 25) / 100) * 100}%`,
                                                                                 }}></div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                        
                                                              {/* Slider Section 2 */}
                                                              <div ref={useOver} className="rangecl-seccmn d-none">
                                                              <div className="price-input">
                                                                    <div className="range-number">
                                                                    <p className="p-number"> 100 - {sliderval2 ?? 55}</p>
                                                                </div>
                                                                  </div>
                                                         
                                                                 <div className="sliderbar-seccmn">
                                                                   <div className="range-inputbar-seccmn">
                                                                     <input
                                                                       type="range"
                                                                       id="rangeminclcmn"
                                                                       className={`range-min-clcmn ${activeThumbout === 'min' ? 'active-thumbout' : ''}`}
                                                                       min={1}
                                                                       max={100}
                                                                       value={sliderval2 ?? 55}
                                                                       onChange={(e) => setSliderVal2(Number(e.target.value))}
                                                                       step={1}
                                                                       onMouseDown={() => setActiveThumbout('min')}
                                                                      onMouseUp={() => setActiveThumbout(null)}
                                                                      onTouchStart={() => setActiveThumbout('min')}
                                                                      onTouchEnd={() => setActiveThumbout(null)}
                                                                     />
                                                                     <div id="progressclbarcmn" className={`progress-cl-barcmn ${sliderval2 < 6 ? 'red-progress' : ''}`} style={{
                                                                                 width: `${(100 - (sliderval2 ?? 55))}%`,
                                                                                 }}></div>
                                                                   </div>
                                                                 </div>
                                                               </div>
                                                               </div>
                                                          
                                                        <div className="ruler-wrpunderover">
                                                            <div className="ruler-holder">
                                                                <div data-ruler-percent="1" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active"
                                                                    style={{display: "none"}}></div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="10" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="20" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="30" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="40" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="50" className="ruler-item active">
                                                                </div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="60" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="70" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="80" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="90" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="" className="ruler-item"></div>
                                                                <div data-ruler-percent="100" className="ruler-item"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="selection-btns-wr">
                                                <div className="selection-f-over-under-wr">
                                                    <button ref={underBtnRef} onClick={handleUnderBtn} id="underBtn" className="over-under-btn type-1 optdw " type="button"><i
                                                            className="ui-lib-ander"></i><span className="over-under-btn-txt"
                                                            title="UNDER">UNDER</span></button>
                                                    <button ref={overBtnRef} onClick={handleOverBtn} id="overBtn"  className="over-under-btn type-2 optup " type="button"><i
                                                            className="ui-lib-over"></i><span className="over-under-btn-txt"
                                                            title="OVER">OVER</span></button>
                                                </div>
                                            </div>
                                            </div>
                                           
    </div>
  )
});

export default UnderOver;