import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  });

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeIntervals = ['days', 'hours', 'minutes', 'seconds'];
  const timerComponents = timeIntervals.map((interval) => (
    <div key={interval} className="text-center">
      <span className="text-xl sm:text-2xl font-bold">{String(timeLeft[interval] || 0).padStart(2, '0')}</span>
      <span className="text-xs uppercase block">{interval}</span>
    </div>
  ));

  const isTimeUp = Object.values(timeLeft).every(val => val === 0);

  return (
    <div className="text-center text-yellow-300 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Register before it's too late!</h2>
      <div className="flex justify-center items-center space-x-2 sm:space-x-4">
        {isTimeUp ? <span>Registration has closed!</span> : timerComponents}
      </div>
    </div>
  );
};

export default CountdownTimer;