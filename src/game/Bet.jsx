import React, { useState } from 'react';

// Constants
const TAB_KEYS = {
  LIVE: 'Live-Bets',
  HISTORY: 'History',
  WINNERS: 'Top-Winners'
};

const tabs = [TAB_KEYS.LIVE, TAB_KEYS.HISTORY, TAB_KEYS.WINNERS];

// Sample Data
const liveBetsData = [
  { id: '5****3', amount: '1.87', bet: '40-100', win: '3.03'  },
  { id: '5****0', amount: '0.93', bet: '31-100', win: '5.92 ' },
  { id: '1****3', amount: '0.54', bet: '17-42', win: '8.92 ' }
];



const topWinnersData = [
  { id: '1****9', type: '19-73', bet: '536.75 ', win: '933.94 ' },
  { id: '5****2', type: '1-9', bet: '58.02 ', win: '618.49 ' },
  { id: '5****8', type: '23-40', bet: '114.64 ', win: '611.03 ' },
  { id: '5****8', type: '40-58', bet: '114.64 ', win: '578.92 ' },
  { id: '5****8', type: '23-41', bet: '114.64 ', win: '578.92 ' },
  { id: '5****8', type: '21-39', bet: '114.64 ', win: '578.92 ' }
];

// Components

const TabNav = ({ activeTab, setActiveTab }) => (
  <div className="top-inside-inner-wrapper">
    <div className="view-select-tabs is-mobile">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`view-select-tab is-mobile ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          <div className="view-select-tab-inner is-mobile">
            <p className="view-select-tab-txt is-mobile">
              {tab.replace('-', ' ')}
            </p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const LiveBets = () =>{
    const [visibleIndexes, setVisibleIndexes] = useState([]);

  const handleReveal = (index) => {
    setVisibleIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
 return (
  <div className="lists-wrapper active" id="Live-Bets">
    <div className="top-of-lists-wrapper">
      <div className="lists-title-row is-mobile">
        {['Player ID', 'Bet ( fun )', 'Bet Type', 'Win ( fun )'].map((title) => (
          <div key={title} className="lists-title-row-item is-mobile">
            <p className="lists-title-row-item-txt is-mobile" title={title}>{title}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bottom-of-lists-wrapper">
      <div className="scrollable-container">
        <div className="list-item-rows-container is-mobile">
          {liveBetsData.map((item, i) => (
            <div key={i} className="list-item-row-component is-mobile">
              <div className="lists-item-row have-hover">
                <div className="lists-item-row-item is-mobile">
                  <div className="inner-lists-item-row-item">
                    <p className="inner-lists-item-row-item-txt is-mobile" title={item.id}>{item.id}</p>
                  </div>
                </div>
                <div className="lists-item-row-item is-mobile">
                  <div className="inner-lists-item-row-item">
                    <p className="inner-lists-item-row-item-txt is-mobile" title={item.amount}>{`${item.amount} fun`}</p>
                  </div>
                </div>
                <div className="lists-item-row-item is-mobile">
                  <div className="inner-lists-item-row-item">
                    <div className="bet-type-coef-row">
                      <div className="bet-type-coef-icon down"><i className="ui-lib-out2"></i></div>
                      <p className="bet-type-coef-text" title={item.bet}>{item.bet}</p>
                      <div className="bet-type-coef-icon down"><i className="ui-lib-out1"></i></div>
                    </div>
                  </div>
                </div>
                <div className="lists-item-row-item is-mobile">
                  <div className="inner-lists-item-row-item">
                    <p className="inner-lists-item-row-item-txt is-mobile"
                        title={visibleIndexes.includes(i) ? `${item.win} fun` : 'Click to reveal'}
                        onClick={() => handleReveal(i)}
                        style={{ cursor: 'pointer' }} >
                        {visibleIndexes.includes(i) ? `${item.win} fun` : '...'}
                      </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}


const History = ({ historyData }) => {
  const [filter, setFilter] = useState('All');

  const filteredData = historyData.filter((item) => {
    const winAmount = parseFloat(item.result);
    if (filter === 'Win') return winAmount > 0;
    if (filter === 'Lose') return winAmount === 0;
    return true; // 'All'
  });

  return (
    <div className="lists-wrapper history active" id="History">
      <div className="top-of-lists-wrapper">
        <div className="lists-title-filter-row is-mobile">
          {['All', 'Win', 'Lose'].map((label) => (
            <div
              key={label}
              className={`lists-title-row-filter-item ${filter === label ? 'active' : ''}`}
              onClick={() => setFilter(label)}
            >
              <p className="lists-title-row-filter-item-txt" title={label}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-of-lists-wrapper">
        <div className="scrollable-container">
          <div className="list-item-rows-container is-mobile">
            {filteredData.map((item, index) => (
              <div key={index} className="list-item-row-component is-mobile">
                <div className="list-item-history" name={`row-${index}`}>
                  <div className="list-item-history-title is-mobile">
                    <div className="list-item-history-inner-item is-mobile big">
                      <p className="list-item-history-inner-item-txt is-mobile big" title={`Round ID ${item.id}`}>
                        {`Round ID ${item.id}`}
                      </p>
                    </div>
                    <div className="list-item-history-inner-item is-mobile small">
                      <p className="list-item-history-inner-item-txt is-mobile big" title={item.time}>{item.time}</p>
                    </div>
                  </div>

                  <div className="list-item-history-item">
                    <div className="list-item-history-inner-item is-mobile big">
                      <p className="list-item-history-inner-item-txt is-mobile big" title="Bet">Bet</p>
                    </div>
                    <div className="list-item-history-inner-item is-mobile">
                      <p className="list-item-history-inner-item-txt is-mobile big" title={item.amount}>{`${item.amount} fun`}</p>
                    </div>
                  </div>

                  <div className="list-item-history-item">
                    <div className="list-item-history-inner-item is-mobile big">
                      <p className="list-item-history-inner-item-txt is-mobile big" title="Bet Type">Bet Type</p>
                    </div>
                    <div className="list-item-history-inner-item is-mobile">
                      <div className="bet-type-coef-row">
                        <div className="bet-type-coef-icon down"><i className="ui-lib-out2"></i></div>
                        <p className="bet-type-coef-text" title={item.bet}>{item.bet}</p>
                        <div className="bet-type-coef-icon down"><i className="ui-lib-out1"></i></div>
                      </div>
                    </div>
                  </div>

                  <div className="list-item-history-item">
                    <div className="list-item-history-inner-item is-mobile big">
                     <p
                        className="list-item-history-inner-item-txt is-mobile big"
                        title={parseFloat(item.result) > 0 ? 'Win' : 'Lose'}
                      >
                      {parseFloat(item.result) > 0 ? 'Win' : 'Lose'} 
                      </p>
                    </div>
                    <div className="list-item-history-inner-item is-mobile">
                      <p
                        className={`list-item-history-inner-item-txt is-mobile big ${
                          parseFloat(item.result) > 0 ? 'win-color' : 'lose-color'
                        }`}
                        title={item.result}
                      >
                        {`${item.result} fun`}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <p className="no-data-text">No results found for "{filter}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const TopWinners = () => (<>
  <div className="lists-wrapper top-winners active" id="Top-Winners">
    <div className="bottom-of-lists-wrapper">
      <div className="scrollable-container">
        <div className="list-item-rows-container is-mobile">
          {topWinnersData.map((item, i) => (
            <div key={i} className="list-item-row-component is-mobile">
              <div className="list-item-history">
                <div className="list-item-history-title">
                  <div className="list-item-history-inner-item big">
                    <p className="list-item-history-inner-item-txt big">Player ID</p>
                  </div>
                  <div className="list-item-history-inner-item small">
                    <p className="list-item-history-inner-item-txt big" title={item.id}>{item.id}</p>
                  </div>
                </div>

                <div className="list-item-history-item">
                  <div className="list-item-history-inner-item big">
                    <p className="list-item-history-inner-item-txt big">Bet Type</p>
                  </div>
                  <div className="list-item-history-inner-item">
                    <div className="bet-type-coef-row">
                      <div className="bet-type-coef-icon down"><i className="ui-lib-out2"></i></div>
                      <p className="bet-type-coef-text" title={item.type}>{item.type}</p>
                      <div className="bet-type-coef-icon down"><i className="ui-lib-out1"></i></div>
                    </div>
                  </div>
                </div>

                <div className="list-item-history-item">
                  <div className="list-item-history-inner-item big">
                    <p className="list-item-history-inner-item-txt big">Bet</p>
                  </div>
                  <div className="list-item-history-inner-item">
                    <p className="list-item-history-inner-item-txt big" title={item.bet}>{`${item.bet} fun`}</p>
                  </div>
                </div>

                <div className="list-item-history-item">
                  <div className="list-item-history-inner-item big">
                    <p className="list-item-history-inner-item-txt big">Win</p>
                  </div>
                  <div className="list-item-history-inner-item">
                    <p className="list-item-history-inner-item-txt big win-color" title={item.win}>{`${item.win}fun`}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </>
);

// Main Component
const Bet = ({ historyData }) => {
  const [activeTab, setActiveTab] = useState(TAB_KEYS.LIVE);

  return (
    <div className="middle-mobile-wrbet">
      <div className="inside-inner-wrapper">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="bottom-inside-inner-wrapper">
          {activeTab === TAB_KEYS.LIVE && <LiveBets />}
          {activeTab === TAB_KEYS.HISTORY && <History historyData={historyData}/>}
          {activeTab === TAB_KEYS.WINNERS && <TopWinners />}
        </div>
      </div>
    </div>
  );
};

export default Bet;
