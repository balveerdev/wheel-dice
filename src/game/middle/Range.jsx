import React, {useImperativeHandle, useState, forwardRef, useEffect, useRef} from 'react'
import '/src/App.css'

const Range = forwardRef (({betAmount, setChance, setOdd, setPayout, setIsBadOdd}, ref) => {
  const [sliderMin3, setSliderMin3] = useState(null);
  const [sliderMax4, setSliderMax4] = useState(null);
  const [activeThumb, setActiveThumb] = useState(null);

  const btnRef1 = useRef();
  const btnRef2 = useRef();
  const btnRef3 = useRef();
  const btnRef4 = useRef();

  const isFirstLoad = useRef(true);



  // 🔁 Snap back logic if sliderMax4 > 95
  useEffect(() => {
    if (activeThumb === null && sliderMax4 > 95) {
      const timeout = setTimeout(() => {
        setSliderMax4(95);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [activeThumb, sliderMax4]);

  // ✅ New Logic: Highlights all matching buttons
  const setButtonStatesBySlider = (min, max) => {
    const ranges = [
      { ref: btnRef1, start: 1, end: 25 },
      { ref: btnRef2, start: 26, end: 50 },
      { ref: btnRef3, start: 51, end: 75 },
      { ref: btnRef4, start: 76, end: 100 },
    ];

    ranges.forEach(({ ref, start, end }) => {
      ref.current.classList.remove("opctup", "opctdw");
      const isOverlap = !(max < start || min > end);
      if (isOverlap) {
        ref.current.classList.add("opctup");
      } else {
        ref.current.classList.add("opctdw");
      }
    });
  };

  // 🔁 Update buttons based on slider change
  useEffect(() => {
    if (sliderMin3 != null && sliderMax4 != null) {
      setButtonStatesBySlider(sliderMin3, sliderMax4);
    }
  }, [sliderMin3, sliderMax4]);

  // 📊 Calculation Logic
  useEffect(() => {
    const bet = parseFloat(betAmount);
    let min = sliderMin3;
    let max = sliderMax4;

    if (isFirstLoad.current) {
      min = 1;
      max = 25;
      setSliderMin3(min);
      setSliderMax4(max);
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

      // 🔴 Red if slider range exceeds 95
      setIsBadOdd(max > 95);
    }

    if (isFirstLoad.current) isFirstLoad.current = false;
  }, [sliderMin3, sliderMax4, betAmount]);

  // 🧲 Button click handlers
  const btnRange125 = () => {
    setSliderMin3(1);
    setSliderMax4(25);
    setButtonStatesBySlider(1, 25);
  };

  const btnRange2550 = () => {
    setSliderMin3(25);
    setSliderMax4(50);
    setButtonStatesBySlider(26, 50);
  };

  const btnRange5075 = () => {
    setSliderMin3(50);
    setSliderMax4(75);
    setButtonStatesBySlider(51, 75);
  };

  const btnRange75100 = () => {
    setSliderMin3(75);
    setSliderMax4(100);
    setButtonStatesBySlider(76, 100);
  };

    const btnRes = () => {
  setSliderMin3(1);
  setSliderMax4(25);
  setButtonStates(btnRef1); // No active
};

// after your useEffects:
useImperativeHandle(ref, () => ({
  getValues: () => {
    const bet = parseFloat(betAmount || 1);
    const min = sliderMin3 ?? 1;
    const max = sliderMax4 ?? 25;
    const rangeCount = max - min + 1;
    const payoutMultiplier = parseFloat((96 / rangeCount).toFixed(2));
    return {
      mode: 'range',
      min,
      max,
      payoutMultiplier,
    };
  }
}));


  return (
    <div ref={ref} className="tab-content active" >
       <div className="inner-selection-tab-content" id="range">
                                            <div className="input-range-wrp-holder">
                                                <div className="input-range-wrp">
                                                    <div className="input-range-holder is-mobile">
                                                        <div className="inp-range-inside">
                                                            <div dir="ltr" className="inp-range-row-item">
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
                                                            
                                                                 <div  className="slidercl-container">
                                                                  <div className="price-input">
                                                                    <div className="range-number">
                                                                    <p className="p-number">{sliderMin3} - {sliderMax4}</p>
                                                                </div>
                                                                  </div>

                                                                    <div className="range-range-progress">
                                                                      <div className="range-slidercl">
                                                                        <div className={`range-progresscl ${sliderMax4 > 95 ? 'red-progress' : ''}`} style={{
                                                                    left: `${(sliderMin3 / 100) * 100}%`,
                                                                    right: `${100 - (sliderMax4 / 100) * 100}%`,
                                                                       }}></div>
                                                                      </div>
                                                                      <div className="range-range-input">
                                                                        <input
                                                                          type="range"
                                                                          className={`range-range-min ${activeThumb === 'min' ? 'active-thumb' : ''}`}
                                                                          min={1}
                                                                          max={100}
                                                                          value={sliderMin3 ?? 1}
                                                                          step={1}
                                                                          onChange={(e) =>
                                                                            setSliderMin3(Math.min(Number(e.target.value), sliderMax4 - 1))
                                                                          }
                                                                          onMouseDown={() => setActiveThumb('min')}
                                                                      onMouseUp={() => setActiveThumb(null)}
                                                                      onTouchStart={() => setActiveThumb('min')}
                                                                      onTouchEnd={() => setActiveThumb(null)}
                                                                        />
                                                                        <input
                                                                         type="range"
                                                                         className={`range-range-max ${activeThumb === 'max' ? 'active-thumb' : ''} ${sliderMax4 > 95 ? 'highlight-thumb' : ''}`}
                                                                         min={1}
                                                                         max={100}
                                                                         value={sliderMax4 ?? 25}
                                                                         step={1}
                                                                         onChange={(e) =>
                                                                           setSliderMax4(Math.max(Number(e.target.value), sliderMin3 + 1))
                                                                         }
                                                                         onMouseDown={() => setActiveThumb('max')}
                                                                      onMouseUp={() => setActiveThumb(null)}
                                                                      onTouchStart={() => setActiveThumb('max')}
                                                                      onTouchEnd={() => setActiveThumb(null)}
                                                                       />
                                                                     </div>
                                                                   </div>
                                                                 </div>
                                                                 </div>
                                                               
                                                        <div className="ruler-wrp">
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
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="30" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="40" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="50" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="60" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="70" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="80" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="90" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="" className="ruler-item "></div>
                                                                <div data-ruler-percent="100" className="ruler-item "></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="selection-btns-wr">
                                                <div dir="rtl" className="selection-f-range-wr">
                                                    <button ref={btnRef1} onClick={btnRange125} id="range-btn11" type="button"  className="range-btn opctup "><span
                                                            className="range-btn-txt">1 - 25</span></button>
                                                    <button ref={btnRef2} onClick={btnRange2550} id="range-btn22" type="button"  className="range-btn opctdw "><span
                                                            className="range-btn-txt">25 - 50</span></button>
                                                    <button ref={btnRef3} onClick={btnRange5075} id="range-btn33" type="button"  className="range-btn opctdw "><span
                                                            className="range-btn-txt">50 - 75</span></button>
                                                    <button ref={btnRef4} onClick={btnRange75100} id="range-btn44" type="button"  className="range-btn opctdw "><span
                                                            className="range-btn-txt">75 - 100</span></button>
                                                    <div  id="range-btn55" onClick={btnRes}  className="range-btn btn-res"><i className="ui-lib-bc-i-resset"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         </div>
  )
});

export default Range;