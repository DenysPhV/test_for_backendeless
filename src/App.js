import React, { useEffect, useState, lazy, Suspense } from 'react';
import {
  useNavigate,
  useLocation,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';

import tabData from './tabs.json';

import './App.css';

// define a dynamic import function for components
const LazyTabComponent = ({ path }) => {
  const TabComponent = lazy(() => import(`./tabs/${path}`));
  return <TabComponent />;
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tabIdFormUrl = location.pathname.replace('/', '');

    if (tabIdFormUrl) {
      setSelectedTab(tabIdFormUrl);
    } else {
      setSelectedTab(tabData[0].id);
    }
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
                className={selectedTab === tab.id ? 'active' : ''}
              >
                <NavLink to={tab.id} onClick={() => handleTabClick(tab.id)}>
                  {tab.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {tabData.map(tab => (
            <Route
              key={tab.id}
              path={tab.id}
              element={<LazyTabComponent path={tab.path} />}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
