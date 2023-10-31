import React from 'react';
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';

import './App.css';

// components
import Table from './dummyTable';

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/dummyTable">Dummy Table</NavLink>
          </li>
          <li>
            <NavLink to="/dummyChart">Dummy Chart</NavLink>
          </li>
          <li>
            <NavLink to="/dummyList">Dummy List</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="*" component={Table} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
