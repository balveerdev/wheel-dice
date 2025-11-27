import React, { useRef, useEffect, useState } from 'react';
import '/src/App.css';


// Update range input background
const updateSliderStyle = (slider, color = '#503a86') => {
  if (!slider) return;
  const val = slider.value;
  slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${val}%, var(--slider-track-color, #ccc) ${val}%, var(--slider-track-color, #ccc) 100%)`;
};

// Toggle show/hide with d-none/d-block
const toggleVisibility = (ref, show) => {
  if (!ref?.classList) return;
  ref.classList.toggle('d-none', !show);
  ref.classList.toggle('d-block', show);
};

// Hook for audio volume control
const useAudioControl = (audioRef, rangeRef, color, setVolumeState) => {
  useEffect(() => {
    const audio = audioRef.current;
    const slider = rangeRef.current;
    if (!slider || !audio) return;

    const volume = slider.value / 100;
    audio.volume = volume;
    updateSliderStyle(slider, color);
    setVolumeState(Number(slider.value));

    audio.play().catch(() => {
      console.warn('Autoplay blocked');
    });
  }, []);

  const handleVolume = () => {
    const slider = rangeRef.current;
    const audio = audioRef.current;

    if (!slider || !audio) return;

    const volume = slider.value / 100;
    audio.volume = volume;
    setVolumeState(Number(slider.value));

    if (volume === 0) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    updateSliderStyle(slider, color);
  };

  return handleVolume;
};

const Header = ({soundVolume, soundRangeRef, balance, handleSoundChange}) => {
  const musicAudioRef = useRef();
  const musicRangeRef = useRef();
  const hAvatars = useRef();
  const hbAvatars = useRef();
  const [selectedAvatar, setSelectedAvatar] = useState(1); // default avatar
 
  const [musicVolume, setMusicVolume] = useState(0); // start at 50%
 
  
useEffect(() => {
  updateSliderStyle(soundRangeRef.current, '#503a86');
}, [soundVolume]);

  const handleMusicVolume = useAudioControl(musicAudioRef, musicRangeRef, '#503a86', setMusicVolume);

  const handleAvatars = () => {
    toggleVisibility(hAvatars.current, hAvatars.current.classList.contains('d-none'));
  };

  const settingsBtn = () => toggleVisibility(hbAvatars.current, true);
  const handleAvatarsBtn = () => toggleVisibility(hbAvatars.current, false);
  const handleAvatarsBtn2 = () => toggleVisibility(hAvatars.current, false);

  

// 🔁 Repeat sound every 7 seconds if volume > 0
  useEffect(() => {
    const interval = setInterval(() => {
      const audio = musicAudioRef.current;
      if (audio && musicVolume > 0) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          console.warn('music autoplay blocked');
        });
      }
    }, 78000);
    return () => clearInterval(interval);
  }, [musicVolume]);

  // on mount
useEffect(() => {
  const stored = localStorage.getItem('chosenAvatar');
  if (stored) setSelectedAvatar(Number(stored));
}, []);

// whenever it changes
useEffect(() => {
  localStorage.setItem('chosenAvatar', selectedAvatar);
}, [selectedAvatar]);

 


  return (
    <div className="mobile-wr">
      <div className="top-mobile-wr is-mobile">
        <div className="top-row is-mobile">
          <div className="top-row-min-max-block is-mobile">
            <div className="user-content">
              <div className="logo-img">
              <a href="#" className='dice-img-sec'>
              <img src="/images/diceimges.png" alt="dice-logo" />
              </a>
              <span className='username'>
              Created by Balveer Solanki
              </span>
              </div>
               <p className='headerNote' style={{fontSize:'8px', backgroundColor: 'transparent', color: 'red', padding:'5px' }}>
                 <strong>⚠ Note:</strong> This game uses only virtual fun coins. No real money, deposits or withdrawals are involved.
                </p>
              <div className="user-info">
                <div className="user-balance-amount is-mobile" title={`${balance} fun`} >{`${balance} fun`}</div>
              </div>
            </div>
          </div>
          
          <div dir="ltr" className="top-row-icon-block is-mobile">
            <div dir="ltr" className="top-row-icon-block-inner is-mobile right">
              <div className={`user-profile is-mobile av-${selectedAvatar}`}>
                   <div
                     dir="ltr"
                     className={`user-profile-action is-mobile av-${selectedAvatar}`}
                     onClick={() => {
                       handleAvatars();
                       handleAvatarsBtn();
                     }}
                   />
                 </div>


              {/* Settings Panel */}
              <div dir="ltr" ref={hAvatars} className="settings-block-wr is-mobile d-none">
                <div className="settings-block is-mobile">
                  <div dir="ltr" className="small-coordinator is-mobile">
                    <svg className="avatars-popover-arrow-svg" viewBox="0 0 18 13" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                        <path className="avatars-popover-arrow-svg-path"
                           d="M0.900542 12.75L0.900162 12.75C0.779742 12.7502 0.662114 12.7185 0.560146 12.6591C0.458241 12.5997 0.376363 12.5153 0.322373 12.4158C0.268431 12.3165 0.24406 12.2055 0.251224 12.0948C0.258389 11.984 0.296909 11.8764 0.363584 11.7839L0.363828 11.7835L8.4639 0.496959C8.57563 0.341634 8.77792 0.25 9.00156 0.25C9.22522 0.25 9.42711 0.341628 9.53836 0.496701L9.53839 0.496741L17.638 11.7827C17.6381 11.7829 17.6383 11.7831 17.6384 11.7832C17.7042 11.876 17.7421 11.9834 17.7489 12.0939C17.7557 12.2046 17.7311 12.3155 17.6772 12.4147C17.6232 12.5141 17.5414 12.5985 17.4397 12.658C17.3381 12.7175 17.2208 12.7496 17.1005 12.75C17.1004 12.75 17.1003 12.75 17.1002 12.75L0.900542 12.75Z"
                           fillOpacity="1" stroke="url(#arrow-svg-gradient)" strokeWidth="0.5">
                        </path>
                        <defs>
                            <linearGradient id="arrow-svg-gradient" x1="9" y1="0" x2="9" y2="13"
                                gradientUnits="userSpaceOnUse">
                                <stop className="arrow-svg-gradient-stop"></stop>
                               <stop className="arrow-svg-gradient-stop" offset="1" stopOpacity="0">
                               </stop>
                            </linearGradient>
                       </defs>
                   </svg>
                  </div>

                  <div className="settings-block-inner is-mobile">
                    <div className="settings-block-inner-content is-mobile">

                       {/* Music Volume */}
                      <div className="settings-block-row is-mobile">
                        <div className="s-bl-row-range-wrp is-mobile">
                          <p className="inp-range-title is-mobile">Music</p>
                          <div className="range-music-sec">
                            <input
                              type="range"
                              ref={musicRangeRef}
                              value={musicVolume}
                              min={0}
                              max={100}
                              step={1}
                              onChange={(e) => {
                                setMusicVolume(Number(e.target.value));
                                handleMusicVolume();
                              }}
                              className="progress"
                              aria-label="Music volume"
                            />
                          </div>
                          <div className="f-c-min-max-line-circle-wrp">
                            <div className="f-c-min-max-line-circle-cont">
                              <div className={`f-c-min-max-line-circle is-mobile ${musicVolume === 0 ? '' : 'd-none'}`} style={{ left: '-2%' }}>
                                <div className="f-c-min-max-line-circle-holder">
                                  <i className="ui-lib-music_off"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sound Volume */}
                      <div className="settings-block-row is-mobile">
                        <div className="s-bl-row-range-wrp is-mobile">
                          <p className="inp-range-title is-mobile">Sound</p>
                          <div className="range-music-sec">
                            <input
                              type="range"
                               ref={soundRangeRef}
                              value={soundVolume}
                               min={0}
                              max={100}
                              step={1}
                              onChange={ handleSoundChange }
                              className="progress2"
                              aria-label="Sound volume"
                            />
                          </div>
                          <div className="f-c-min-max-line-circle-wrp">
                            <div className="f-c-min-max-line-circle-cont">
                              <div className={`f-c-min-max-line-circle ${soundVolume === 0 ? '' : 'd-none'}`} style={{ left: '-2%' }}>
                                <div className="f-c-min-max-line-circle-holder">
                                  <i className="ui-lib-Volume-Off"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Avatar Settings Button */}
                      <div className="settings-block-row is-mobile">
                        <div className="settings-avatars">
                          <p className="settings-avatars-heading" title="Avatars">Avatars</p>
                          <div className="settings-avatars-btn" onClick={() => { settingsBtn(); handleAvatarsBtn2(); }}>
                            <i className="ui-lib-edit"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Popover */}
              <div dir="ltr" ref={hbAvatars} className="avatars-popover-holder is-mobile d-none">
                <div className="avatars-popover is-mobile">
                  <div dir="ltr" className="avatars-popover-arrow is-mobile">
                    <svg className="avatars-popover-arrow-svg" viewBox="0 0 18 13" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path className="avatars-popover-arrow-svg-path"
                          d="M0.900542 12.75L0.900162 12.75C0.779742 12.7502 0.662114 12.7185 0.560146 12.6591C0.458241 12.5997 0.376363 12.5153 0.322373 12.4158C0.268431 12.3165 0.24406 12.2055 0.251224 12.0948C0.258389 11.984 0.296909 11.8764 0.363584 11.7839L0.363828 11.7835L8.4639 0.496959C8.57563 0.341634 8.77792 0.25 9.00156 0.25C9.22522 0.25 9.42711 0.341628 9.53836 0.496701L9.53839 0.496741L17.638 11.7827C17.6381 11.7829 17.6383 11.7831 17.6384 11.7832C17.7042 11.876 17.7421 11.9834 17.7489 12.0939C17.7557 12.2046 17.7311 12.3155 17.6772 12.4147C17.6232 12.5141 17.5414 12.5985 17.4397 12.658C17.3381 12.7175 17.2208 12.7496 17.1005 12.75C17.1004 12.75 17.1003 12.75 17.1002 12.75L0.900542 12.75Z"
                          fillOpacity="1" stroke="url(#arrow-svg-gradient)" strokeWidth="0.5">
                      </path>
                      <defs>
                          <linearGradient id="arrow-svg-gradient" x1="9" y1="0" x2="9" y2="13"
                              gradientUnits="userSpaceOnUse">
                              <stop className="arrow-svg-gradient-stop"></stop>
                              <stop className="arrow-svg-gradient-stop" offset="1" stopOpacity="0">
                              </stop>
                          </linearGradient>
                      </defs>
                  </svg>
                  </div>
                  <div className="avatars-popover-content is-mobile">
                    <div className="avatars-popover-content-title is-mobile">Choose your avatar</div>
                    <div className="popover-avatars is-mobile">
                      {[...Array(25)].map((_, i) => (
                        <div
                          key={i}
                          className={`avatar-b is-mobile av-${i + 1} ${selectedAvatar === i + 1 ? 'active' : ''}`}
                          onClick={() => setSelectedAvatar(i + 1)}
                        ></div>
                      ))}
                    </div>



                  </div>
                </div>
              </div>

            </div>
             <audio
              ref={musicAudioRef}
              src="/sound/music.mp3"
               preload="auto" 
              style={{ display: 'none' }}
            />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
