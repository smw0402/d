import React from 'react';

function StockTable({ stocks }) {
  if (!stocks.length) return <p>No stocks found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Name</th>
          <th>Close</th>
          <th>PER</th>
          <th>PBR</th>
          <th>ROE</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.Ticker}>
            <td>{stock.Ticker}</td>
            <td>{stock.Name}</td>
            <td>{stock.Close}</td>
            <td>{stock.PER}</td>
            <td>{stock.PBR}</td>
            <td>{stock.ROE}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
6. Frontend App Component (frontend/src/App.js)
javascript
코드 복사
import React, { useState } from 'react';
import StockForm from './components/StockForm';
import StockTable from './components/StockTable';

function App() {
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async (query) => {
    const response = await fetch('/fetch_stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    if (data.success) {
      setStocks(data.data);
    } else {
      console.error(data.error);
    }
  };

  return (
    <div>
      <h1>Stock Analysis Tool</h1>
      <StockForm onFetch={fetchStocks} />
      <StockTable stocks={stocks} />
    </div>
  );
}

export default App;
