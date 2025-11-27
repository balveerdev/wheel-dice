import React, {useImperativeHandle, useState, useEffect, useRef,  forwardRef } from 'react';
import '/src/App.css'

const InOut =  forwardRef (({ betAmount, setChance, setOdd, setPayout, setIsBadOdd }, ref) => {
     const [minValue, setMinValue] = useState(null);
           const [maxValue, setMaxValue] = useState(null);
             const [minValue1, setMinValue1] = useState(null);
             const [maxValue1, setMaxValue1] = useState(null);
           const [activeThumb, setActiveThumb] = useState(null); // values: 'min' or 'max'
           const [activeThumbout, setActiveThumbout] = useState(null); // values: 'min' or 'max'
          //  const isConflict = minValue1 >= maxValue1;
           const activeInBtn = useRef();
           const activeOutBtn = useRef();
           const [mode, setMode] = useState('in'); // 'in' or 'out'
           const InBtnRef = useRef();
           const OutBtnRef = useRef();

           const safeMin = typeof minValue1 === 'number' && !isNaN(minValue1) ? minValue1 : 30;
const safeMax = typeof maxValue1 === 'number' && !isNaN(maxValue1) ? maxValue1 : 75;
const isConflict = safeMin >= safeMax;



          
           function handleInBtn() {
  setMode('in');
  activeInBtn.current.style.display = "block";
  activeOutBtn.current.style.display = "none";
  InBtnRef.current.classList.add("optdw");
  InBtnRef.current.classList.remove("optup");
  OutBtnRef.current.classList.add("optup");
  OutBtnRef.current.classList.remove("optdw");
}

function handleOutBtn() {
  setMode('out');
  activeOutBtn.current.style.display = "block";
  activeInBtn.current.style.display = "none";
  InBtnRef.current.classList.add("optup");
  InBtnRef.current.classList.remove("optdw");
  OutBtnRef.current.classList.add("optdw");
  OutBtnRef.current.classList.remove("optup");
}

           
    
          useEffect(() => {
      if (activeThumb === null && maxValue > 95) {
        const timeout = setTimeout(() => {
          setMaxValue(95); // snap back to 95
        }, ); // delay for smoother snap
    
        return () => clearTimeout(timeout);
      }
    }, [activeThumb, maxValue]);

  // 'In' or 'Out'

const isFirstLoad = useRef(true);

useEffect(() => {
  const bet = parseFloat(betAmount);

  if (mode === 'in') {
    let min = minValue;
    let max = maxValue;

    // Set defaults once
    if (isFirstLoad.current) {
      min = 25;
      max = 55;
      setMinValue(min);
      setMaxValue(max);
    }

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

      
      if (max > 95) {
        setIsBadOdd(true);
      } else {
        setIsBadOdd(false);
      }
    }

  } else if (mode === 'out') {
    let min = minValue1;
    let max = maxValue1;

    // Set defaults once
    if (isFirstLoad.current) {
      min = 30;
      max = 75;
      setMinValue1(min);
      setMaxValue1(max);
    }

    const leftRange = min - 1 + 1;
    const rightRange = 100 - max + 1;
    const totalOutRange = leftRange + rightRange;

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

      
      if (isConflict === true) {
        setIsBadOdd(true);
      } else {
        setIsBadOdd(false);
      }
    }
  }

  if (isFirstLoad.current) isFirstLoad.current = false;

}, [mode, minValue, maxValue, minValue1, maxValue1, betAmount]);


useEffect(() => {
  if (minValue1 === null || typeof minValue1 !== 'number') {
    setMinValue1(30);
  }
  if (maxValue1 === null || typeof maxValue1 !== 'number') {
    setMaxValue1(75);
  }
}, [minValue1, maxValue1]);


    useEffect(() => {
      if (isFirstLoad.current) {
        if (mode === 'in') handleInBtn();
        else handleOutBtn();
      }
    }, []);

    useImperativeHandle(ref, () => ({
      getValues: () => {
        if (mode === 'in') {
          const min = minValue ?? 25;
          const max = maxValue ?? 55;
          const payoutMultiplier = parseFloat((96 / (max - min + 1)).toFixed(2)) || 1;
          return { mode: 'in', min, max, payoutMultiplier };
        } else {
          const min = safeMin;
          const max = safeMax;
          const leftRange = min;
          const rightRange = 100 - max + 1;
          const payoutMultiplier = parseFloat((96 / (leftRange + rightRange)).toFixed(2)) || 1;
          return { mode: 'out', min, max, payoutMultiplier };
        }
      },
    }));

  return (
    <div ref={ref} className="tab-content active">
        <div  className="inner-selection-tab-content " id="inOut">
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
                                                          <div ref={activeInBtn} className="slidercl-container d-block">
                                                                 <div className="price-input">
                                                                    <div className="range-number">
                                                                    <p className="p-number">{minValue} - {maxValue}</p>
                                                                </div>
                                                                  </div>
                                                              
                                                                  <div className="range-progress">
                                                                  <div className="slidercl">
                                                                    <div className={`progresscl ${maxValue > 95 ? 'red-progress' : ''}`} style={{
                                                                    left: `${(minValue / 100) * 100}%`,
                                                                    right: `${100 - (maxValue / 100) * 100}%`,
                                                                       }}></div>
                                                                  </div>
                                                                  <div className="range-input ">
                                                                    <input
                                                                      type="range"
                                                                      className={`range-min ${activeThumb === 'min' ? 'active-thumb' : ''}`}
                                                                      id="slider1"
                                                                      min={1}
                                                                      max={100}
                                                                      value={minValue ?? 25}
                                                                      step={1}
                                                                      onChange={(e) =>
                                                                        setMinValue(Math.min(Number(e.target.value), maxValue - 1))
                                                                      }
                                                                      onMouseDown={() => setActiveThumb('min')}
                                                                      onMouseUp={() => setActiveThumb(null)}
                                                                      onTouchStart={() => setActiveThumb('min')}
                                                                      onTouchEnd={() => setActiveThumb(null)}
                                                                    />

                                                                    <input
                                                                      type="range"
                                                                      className={`range-max ${activeThumb === 'max' ? 'active-thumb' : ''} ${maxValue > 95 ? 'highlight-thumb' : ''}`}
                                                                      id="slider2"
                                                                      min={1}
                                                                      max={100}
                                                                      value={maxValue ?? 55}
                                                                      step={1}
                                                                      onChange={(e) =>
                                                                        setMaxValue(Math.max(Number(e.target.value), minValue + 1))
                                                                      }
                                                                      onMouseDown={() => setActiveThumb('max')}
                                                                      onMouseUp={() => setActiveThumb(null)}
                                                                      onTouchStart={() => setActiveThumb('max')}
                                                                      onTouchEnd={() => setActiveThumb(null)}
                                                                    />

                                                                   </div>
                                                                   </div>
                                                                   </div>

                                                                     {/* Slider Section 2 */}
                                                                     <div ref={activeOutBtn} className="slider-group-container d-none"> 
                                                                     <div className="range-values">
                                                               <div id="min-value-display">
                                                                  <div className="range-number">
                                                                    <p className="p-number">1 - {Math.min(safeMin, safeMax)}</p>
                                                                </div>
                                                               </div>
                                                               <div id="max-value-display">
                                                                  <div className="range-number">
                                                                    <p className="p-number">{Math.max(safeMin, safeMax)} - 100</p>
                                                                </div>
                                                               </div>
                                                             </div>

                                                                     <div className="slider-group">
                                                                         <div className="range-input-wrapper ">
                                                                             <input type="range" className={`range-inputbar left-slider-wrapper ${isConflict ? 'red-thumb animate-thumb' : ''} ${activeThumbout === 'min' ? 'active-thumbout' : ''}`}
                                                                              id="slider3" min={1} max={100} value={safeMin} step={1} onChange={(e) => {
                                                                               const newMin = Number(e.target.value);

                                                                               // Only allow correction if max is set
                                                                                if (newMin >= maxValue1) {
                                                                               setTimeout(() => {
                                                                                setMinValue1(maxValue1 - 5);
                                                                                }, 300)} 
                                                                                  setMinValue1(newMin);

                                                                              }}
                                                                               onMouseDown={() => setActiveThumbout('min')}
                                                                               onMouseUp={() => setActiveThumbout(null)}
                                                                               onTouchStart={() => setActiveThumbout('min')}
                                                                               onTouchEnd={() => setActiveThumbout(null)}
                                                                               />
                                                                             <div className={`leftprogressbar ${isConflict ? 'red-progress animate-bar' : ''}`}
                                                                              style={{
                                                                                 left: `0%`,
                                                                                width: `${safeMin}%`,
                                                                              }} ></div>
                                                                         </div>

                                                                         <div className="range-input-wrapper ">
                                                                             <input type="range" className={`range-inputbar right-slider-wrapper ${isConflict ? 'red-thumb animate-thumb' : ''} ${activeThumbout === 'max' ? 'active-thumbout' : ''}`}
                                                                                id="slider4" min={1} max={100} value={safeMax} step={1}onChange={(e) => {
                                                                                    const newMax = Number(e.target.value);

                                                                                    if (newMax <= minValue1) {
                                                                                        setTimeout(() => {
                                                                                             setMaxValue1(minValue1 + 5);
                                                                                       }, 300)} 
                                                                                      setMaxValue1(newMax);
                                                                                   
                                                                                  }}


                                                                               onMouseDown={() => setActiveThumbout('max')}
                                                                               onMouseUp={() => setActiveThumbout(null)}
                                                                               onTouchStart={() => setActiveThumbout('max')}
                                                                               onTouchEnd={() => setActiveThumbout(null)}
                                                                               />
                                                                             <div className={`rightprogressbar ${isConflict ? 'red-progress animate-bar' : ''}`}
                                                                              style={{
                                                                                left: `${safeMax}%`,
                                                                                width: `${100 - safeMax}%`,
                                                                              }}></div>
                                                                         </div>
                                                                     </div>

                                                                </div>
                                                        </div>
                                                        </div>
                                                            <div className="ruler-wrpinout">
                                                            <div className="ruler-holder">
                                                                <div data-ruler-percent="1" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "
                                                                    style={{display: "none"}}></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="10" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="20" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="30" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
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
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="50" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="60" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item 
                    active
                    
                    "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="70" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="80" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="90" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="" className="ruler-item  "></div>
                                                                <div data-ruler-percent="100" className="ruler-item  ">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="selection-btns-wr">
                                                <div className="selection-f-over-under-wr">
                                                    <button ref={InBtnRef} onClick={handleInBtn} id="inBtn" className="over-under-btn type-1 optdw" type="button"
                                                        fdprocessedid="069jac"><i className="ui-lib-out2"></i><span
                                                            className="over-under-btn-txt" title="In">In</span><i
                                                            className="ui-lib-out1"></i></button>
                                                    <button ref={OutBtnRef} onClick={handleOutBtn} id="outBtn" className="over-under-btn type-2 optop" type="button"
                                                        fdprocessedid="eb3cyg"><i className="ui-lib-out1"></i><span
                                                            className="over-under-btn-txt" title="Out">Out</span><i
                                                            className="ui-lib-out2"></i></button>
                                                </div>
                                            </div>
    </div>
  )
});

export default InOut;