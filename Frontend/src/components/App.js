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
7. Frontend Dependencies
Add these in frontend/package.json:

json
코드 복사
"dependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-scripts": "4.0.3"
}
