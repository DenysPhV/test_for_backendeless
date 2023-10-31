import React, { useEffect, useState, lazy, Suspense } from 'react';
import {
  useNavigate,
  useLocation,
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import tabData from './tabs.json';

import './App.css';

// define a dynamic import function for components
const importTabComponent = lazy(path => import(`./tabs/${path}`));

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
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
