import React from 'react';

const DummyChart = ({ title, order }) => (
  <div>
    <h2>{title}</h2>
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
        {order}
      </tbody>
    </table>
  </div>
);

export default DummyChart;
