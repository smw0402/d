import React, { useState } from 'react';

function StockForm({ onFetch }) {
  const [date, setDate] = useState('');
  const [market, setMarket] = useState('KOSPI');
  const [criteria, setCriteria] = useState('Undervalued');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetch({ date, market, criteria });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter date (YYYYMMDD)"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={market} onChange={(e) => setMarket(e.target.value)}>
        <option value="KOSPI">KOSPI</option>
        <option value="KOSDAQ">KOSDAQ</option>
      </select>
      <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
        <option value="Undervalued">Undervalued</option>
        <option value="Growth">Growth</option>
        <option value="Stable Dividend">Stable Dividend</option>
        <option value="Risk-Minimized">Risk-Minimized</option>
        <option value="Long-Term">Long-Term</option>
      </select>
      <button type="submit">Fetch Stocks</button>
    </form>
  );
}

export default StockForm;
