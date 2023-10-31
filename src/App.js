import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';

import tabData from './tabs.json';

import './App.css';

// components
// define a dynamic import function
const importTabComponent = path => {
  return lazy(() => import(`./${path}`));
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the current URL to determine the selected tab
    const tabId = location.pathname.replace('/', '');
    setSelectedTab(tabId);
  }, [location]);

  const handleTabClick = tabId => {
    setSelectedTab(tabId);
    navigate(tabId);
  };

  return (
    <div>
      <nav>
        <ul>
          {tabData
            .sort((a, b) => a.order - b.order)
            .map(tab => (
              <li
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={selectedTab === tab.id ? 'active' : ''}
              >
                {tab.title}
              </li>
            ))}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        {tabData.map(tab => (
          <Routes key={tab.id}>
            <Route
              path={tab.id}
              element={React.createElement(importTabComponent(tab.path), {
                data: tab,
              })}
            />
          </Routes>
        ))}
      </Suspense>
    </div>
  );
};

export default App;
