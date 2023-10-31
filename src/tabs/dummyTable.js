import React from 'react';

const DummyTable = ({ data }) => (
  <div>
    <h2>Dummy Table</h2>
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
        {data}
      </tbody>
    </table>
  </div>
);

export default DummyTable;
