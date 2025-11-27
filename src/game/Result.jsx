import React, { useState } from 'react';

const results = [
  { id: '24009580', value: 'Soon' },
  { id: '24009577', value: 'Soon' },
  { id: '24009574', value: 'Soon' },
  { id: '24009572', value: 'Soon' },
  { id: '24009569', value: 'Soon' },
  { id: '24009566', value: '●●●' },
  { id: '24009563', value: '21' },
  { id: '24009560', value: '25' },
  { id: '24009558', value: '38' },
  { id: '24009555', value: '44' },
  { id: '24009552', value: '96' },
  { id: '24009549', value: '52' },
  { id: '24009546', value: '49' },
  { id: '24009543', value: '53' },
  { id: '24009541', value: '41' },
  { id: '24009538', value: '57' },
];

const generateStatistics = () =>
  Array.from({ length: 99 }, (_, i) => ({
    number: i + 1,
    percent: Math.floor(Math.random() * 5), // 0 to 4
  }));

const Result = () => {
  const [activeTab, setActiveTab] = useState('Result');
  const [activeRounds, setActiveRounds] = useState(100);
  const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'asc' | 'desc'

  const [statisticsMap] = useState({
    100: generateStatistics(),
    200: generateStatistics(),
    500: generateStatistics(),
  });

  const handleSortToggle = () => {
    setSortOrder((prev) =>
      prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'
    );
  };

  const getSortedData = () => {
    const data = [...statisticsMap[activeRounds]];
    if (sortOrder === 'asc') {
      return data.sort((a, b) => a.percent - b.percent);
    } else if (sortOrder === 'desc') {
      return data.sort((a, b) => b.percent - a.percent);
    }
    return data;
  };

  const getIconClass = () => {
    switch (sortOrder) {
      case 'asc':
        return 'ui-lib-sort';
      case 'desc':
        return 'ui-lib-sort-down';
      default:
        return 'ui-lib-all-sort';
    }
  };

  return (
    <div className="middle-mobile-wrres">
      <div className="inside-inner-wrapper">
        {/* Tabs */}
        <div  className="top-inside-inner-wrapper">
          <div  className="view-select-tabs is-mobile">
            {['Result', 'Statistics'].map((tab) => (
              <div
                key={tab}
                className={`view-select-tab is-mobile ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="view-select-tab-inner is-mobile">
                  <p className="view-select-tab-txt is-mobile">{tab}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bottom-inside-inner-wrapper">
          {activeTab === 'Result' && (
            <div className="lists-wrapper active" id="Result">
              <div className="top-of-lists-wrapper">
                <div className="lists-title-row is-mobile">
                  <div className="lists-title-row-item is-mobile">
                    <p className="lists-title-row-item-txt is-mobile">Round ID</p>
                  </div>
                  <div className="lists-title-row-item is-mobile" />
                  <div className="lists-title-row-item is-mobile">
                    <p className="lists-title-row-item-txt is-mobile">Check</p>
                  </div>
                </div>
              </div>
              <div className="bottom-of-lists-wrapper">
                <div className="scrollable-container">
                  <div className="list-item-rows-container is-mobile">
                    {results.map(({ id, value }) => (
                      <div className="list-item-row-component is-mobile" key={id} name={id}>
                        <div className="lists-item-row is-mobile have-hover">
                          <div className="lists-item-row-item is-mobile">
                            <div className="inner-lists-item-row-item ">
                              <p className="inner-lists-item-row-item-txt is-mobile" title={id}>{id}</p>
                            </div>
                          </div>
                          <div className="lists-item-row-item is-mobile">
                            <div className="inner-lists-item-row-item ">
                              <p className={`inner-lists-item-row-item-txt is-mobile no-text-transform`} title={value}>{value === '●●●' ? (
                              <span className="dot-typing">
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              </span>) : (value)}</p>
                            </div>
                          </div>
                          <div className="lists-item-row-item is-mobile">
                            <div className="inner-lists-item-row-item item-row-item ">
                              <img className="list-checked-img cursor-p" alt="check" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARBSURBVHgBzVY9bFxFEP7m3cNSCiQ3iajwCygSpMA2BRI02HR0oaMitoSoUHwdEo3vREKUiMJOjZRzSRVTUTopaGhyRkIKiSK/jkg0Z4XA/bzdYWZn992L7ViXLk96vre7M9988+3OrIFX6bnBaF+V92V8aFbD6xXWkOG2ujDx2reEnVn8slmMrjlsMOi294D3DDj0vpugM4vvqRlc/w+FaylrrIQJwSaSDPTDhr3Kods9g/KlAlz7B0tVC5cywoYM5wOeWHL4JQ7QHGLFT/QcTg5Em8Iyr1CIc4E5LJLHkqiwQjG+sqWgu37KXwkQcVGPxUTtMlCfW3zXjXEvJwyE4IA6T2O+SFkH1EZ+gTHVa2EgqJoO1cJFb6boXSuTs3s+Iw4Mo41XYKY6nMlENQOVi4NNpCVjb9kk+XKRI6Zo3Mkz1VvYoB3JhzEbsAkXZdRlYiOTBFCmmoFNNhIzgETbAkadiNOcbThMqpC1bF9D4phXxo5KOd8BUIPpNzsBiK93evZ1jW3NE+sc67LjUvza7Hk/zIm/Sq4iRL8yE4OBDMg5mVQge5nrb0JwCsAUArGROBSWn109h23nsB3Wow8iMXISQKKXHBnC1yyCAVvlhmCBloHr/KFU8+r359D/5i8UItCmZWxBNJgox5XHIHeVFAfVx9pOSH2I0vHgtONhUyWB9Ztvot8+kCKscEcwF+pjmvbITkA/E6b7cLJLlTJn1c1YOAyE5b3ITF/LiHlNwHcVfI5oT+YWEbVPsvogkx4qCTABdl1wDKkJMJH+SqzOjQKr8tnRBuc55NG+uWBdNIcw97zohZj5J3lMIvHn0TPs51vnMbjymEpprIUicKoibhWQ/H9YQPfKYzunt97Gti59/TDrjT0+1vMca0PPKFlTsQqUqf6td32Z63Dks11ZbDd1FKP2l4/ywx8vVB0B7qZS/+rha70x4XIoAKtOToGQykL7IPNdycXug1GV/zziDCNJU4LBXsLEtza/+HOuk8D1W+wuB1vXopFvYchmqz5DecesvzIe0w7QaEqfPzizJ+FXrImkVChV8RaZ7Ubqz7USRhqNhqUplT+9Mzwf98qeYZXtSD4rUxdpthSdWeSzhQhlzUJ1N7mb94pScZ3GaPp8+sfrBwJSRKdjFulCqMectpVRT5M/+OXis7eSTd4MIJqvO/DeFFwQ/HQDwVm8AQyQY2mGDKKPWHSbmMeuzI9+n78jrC7xUdZW6w0Zpus2E7pA79f3ButNvPxogH8d1jOiJXEo6jxQ3wbpzuR4vZCdyrAlpWPuHsU78dK/eP+sBFCpaL5hme4DPuKn8Q4rVMsPlgflTAH0ufDb2SXOMzm6mKemNR8zHUivWH30wd/9k3BO/b+ouP9GIX1GglCBdKNN9VKxDloTfFJ++KR8Ecap/9mVy0/KSYbVMagnlUpDbiFUsVSsNMmtp63h+6eB6/M/whDgIp3/j2cAAAAASUVORK5CYII=" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Statistics' && (
            <div className="middle-mobile-wrstat">
              <div className="lists-wrapper statistics">
                <div className="top-of-lists-wrapper">
                  <div className="lists-title-filter-row">
                    <div
                      className="lists-title-row-filter-item"
                      onClick={handleSortToggle}
                      style={{ cursor: 'pointer' }}
                    >
                      <p className="lists-title-row-filter-item-txt">
                        <i className={`all-statistics ${getIconClass()}`} />
                      </p>
                    </div>
                    <div className="d-f-custom">
                      <div className="lists-title-row-item">
                        <p className="lists-title-row-item-txt" title="Last Rounds">
                          Last Rounds
                        </p>
                      </div>
                      {[100, 200, 500].map((val) => (
                        <div
                          key={val}
                          className={`lists-title-row-filter-item ${
                            activeRounds === val ? 'active' : ''
                          }`}
                          onClick={() => setActiveRounds(val)}
                        >
                          <p className="lists-title-row-filter-item-txt">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bottom-of-lists-wrapper">
                  <div className="scrollable-container">
                    <div className="statistics-block">
                      {getSortedData().map(({ number, percent }) => (
                        <div key={number} className="statistics-block-items">
                          <span className="items-number">{number}</span>
                          <div className="items-loading">
                            <div className="items-loading-title">
                              <span
                                className="loading-percent"
                                style={{
                                  width: `${percent}%`,
                                  backgroundColor: percent > 0 ? '#6c5ce7' : '#dfe6e9',
                                }}
                              />
                            </div>
                          </div>
                          <span className="items-percent">{percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
