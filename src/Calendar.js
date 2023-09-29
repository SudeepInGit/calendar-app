
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './Calendar.css';

function Calendar(props) {
  const daysOfWeek = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], []);

  const [calendar, setCalendar] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState('');
  const generateCalendar = useCallback(() => {
    const inputYear = parseInt(props.year);
    const inputMonth = parseInt(props.month);

    if (isNaN(inputYear) || isNaN(inputMonth) || inputMonth < 1 || inputMonth > 12) {
      alert('Please enter a valid month between 1 and 12')
      setCalendar([]);
      return
    }
    

    const firstDayOfMonth = new Date(inputYear, inputMonth - 1, 1);
    const lastDayOfMonth = new Date(inputYear, inputMonth, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const newCalendar = [];

    const headerRow = daysOfWeek.map((day) => (
      <th key={day}>{day}</th>
    ));
    newCalendar.push(<tr key="header">{headerRow}</tr>);

    let currentRow = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      currentRow.push(<td key={`empty-${i}`} className="other-month" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(inputYear, inputMonth - 1, day);
      currentRow.push(
        <td key={day} className={date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()}>
          {day}
        </td>
      );

      if (date.getDay() === 6) {
        newCalendar.push(<tr key={day}>{currentRow}</tr>);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      newCalendar.push(<tr key="last">{currentRow}</tr>);
    }

    setCalendar(newCalendar);
    
    const options = { month: 'long' };
    setDisplayedMonth(firstDayOfMonth.toLocaleDateString(undefined, options));
  }, [props.year, props.month, daysOfWeek]);

  useEffect(() => {
    generateCalendar();
  }, [props.month, props.year, generateCalendar]);

  return (
    <div>
      <h2>{displayedMonth} {props.year}</h2>
      <table>
        <tbody>{calendar}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
