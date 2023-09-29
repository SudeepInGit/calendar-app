import React, { useState } from 'react';
import Calendar from './Calendar';

function App() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const inputMonth = parseInt(month);
    if (isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
      if (!alertShown) {
        window.alert("Please enter a valid month between 1 and 12.");
        setAlertShown(true);
      }
      return; 
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setSubmitted(false);
    setAlertShown(false); 
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setSubmitted(false);
    setAlertShown(false); 
  };

  return (
    <div className="App">
      <h1>Calendar App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={handleMonthChange}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={handleYearChange}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && !alertShown && <Calendar month={month} year={year} />}
    </div>
  );
}

export default App;
