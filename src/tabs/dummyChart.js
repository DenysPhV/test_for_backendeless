import React from 'react';

const DummyChart = ({ path }) => (
  <div>
    <h2>Dummy Chart</h2>
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
        </tr>
        {path}
      </tbody>
    </table>
  </div>
);

export default DummyChart;
