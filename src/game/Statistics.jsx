import React,{useState} from 'react';

const generateStatistics = () =>
 Array.from({ length: 99 }, (_, i) => ({
  number: i + 1,
  percent: Math.floor(Math.random() * 5), // 0 to 4
}));




const Statistics = () => {

  
  const [activeRounds, setActiveRounds] = useState(100); // default tab
  const [statisticsMap] = useState({
    100: generateStatistics(),
    200: generateStatistics(),
    500: generateStatistics(),

  });

   const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'asc' | 'desc'

  // Handle icon click
  const handleSortToggle = () => {
    setSortOrder((prev) =>
      prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'
    );
  };

  // Determine current sorted data
  const getSortedData = () => {
    const data = [...statisticsMap[activeRounds]];
    if (sortOrder === 'asc') {
      return data.sort((a, b) => a.percent - b.percent);
    } else if (sortOrder === 'desc') {
      return data.sort((a, b) => b.percent - a.percent);
    }
    return data; // original
  };

  // Get icon class by sort state
  const getIconClass = () => {
    switch (sortOrder) {
      case 'asc':
        return 'ui-lib-sort'; // Define this in CSS or use an icon lib
      case 'desc':
        return 'ui-lib-sort-down';
      default:
        return 'ui-lib-all-sort'; // Default icon
    }
  };
  return (
    <div className="middle-mobile-wrstat">
      <div className="lists-wrapper statistics">
        <div className="top-of-lists-wrapper">
          <div className="lists-title-filter-row">
            <div className="lists-title-row-filter-item" onClick={handleSortToggle} style={{ cursor: 'pointer' }}>
              <p className="lists-title-row-filter-item-txt" title="">
                <i className={`all-statistics ${getIconClass()}`} />
              </p>
            </div>
            <div className="d-f-custom">
              <div className="lists-title-row-item">
                <p className="lists-title-row-item-txt" title="Last Rounds">Last Rounds</p>
              </div>
              {[100, 200, 500].map((val, idx) => (
                <div key={val} className={`lists-title-row-filter-item ${activeRounds === val ? 'active' : ''}`} onClick={() => setActiveRounds(val)}>
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
                        style={{ width: `${percent}%` }} // matches text exactly
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
  );
};

export default Statistics;
