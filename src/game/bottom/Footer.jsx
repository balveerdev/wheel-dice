import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation items
  const menuItems = [
    {
      label: 'Game',
      path: '/',
      img: '/images/dice-btn-icon.svg',
      imgActive: '/images/dice-btn-icon-active.svg',
    },
    {
      label: 'Statistics',
      path: '/statistics',
      img: '/images/menu-statistics.svg',
      imgActive: '/images/menu-statistics-active.svg',
    },
    {
      label: 'Bet',
      path: '/bet',
      img: '/images/menu-bet.svg',
      imgActive: '/images/menu-bet-active.svg',
    },
    {
      label: 'Result',
      path: '/result',
      img: '/images/menu-result.svg',
      imgActive: '/images/menu-result-active.svg',
    },
    {
      label: 'Info',
      path: '/info',
      img: '/images/menu-help.svg',
      imgActive: '/images/menu-help-active.svg',
    },
  ];

  return (
    <div className="bottom-mobile-wr">
      <div className="mobile-navigation-row">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className={`mobile-navigation-row-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <div className="mobile-navigation-row-item-top">
                <img
                  className="menu-img"
                  src={isActive ? item.imgActive : item.img}
                  alt={item.label}
                />
              </div>
              <div className="mobile-navigation-row-item-bottom">
                <p className="mobile-navigation-row-item-txt">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
