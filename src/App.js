import React, { useState, Suspense } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';

import tabData from './tabs.json';

import './App.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(tabData[0].id);

  return (
    <div>
      <nav>
        <ul>
          {tabData
            .sort((a, b) => a.order - b.order)
            .map(tab => (
              <li
                key={tab.id}
                className={selectedTab === tab.id ? 'active' : ''}
              >
                <NavLink to={tab.id} onClick={() => setSelectedTab(tab.id)}>
                  {tab.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabData.map(tab => {
            const LazyTabComponent = React.lazy(() =>
              delayForDemo(import(`${tab.path}`)),
            );
            return (
              <Route
                key={tab.id}
                path={`/${tab.id}`}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyTabComponent order={tab.order} title={tab.title} />
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

export default App;
