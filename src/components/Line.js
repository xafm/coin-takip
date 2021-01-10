import React, {useEffect, useState} from 'react';

function Line({symbol, buyPrice, price, sellPrice, buyDate, sellDate}) {
  const [timePassed, setTimePassed] = useState('');
  const changePercentage = (((price - buyPrice) * 100) / buyPrice).toFixed(4);
  const changePercentageClassName =
    changePercentage > 0 ? 'positive' : 'negative';

  let sellPercentage = (((sellPrice - buyPrice) * 100) / buyPrice).toFixed(4);
  const sellPercentageClassName = sellPercentage > 0 ? 'positive' : 'negative';

  if (isNaN(sellPercentage)) {
    sellPercentage = '';
  } else {
    sellPercentage += '%';
  }

  let sellPriceFormatted = '';
  if (sellPrice) {
    sellPriceFormatted = sellPrice.toFixed(8);
  }

  let changePercentageString = isNaN(changePercentage)
    ? ''
    : changePercentage + '%';
  // console.log(new Date(sellDate) - Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      let timePassedx = sellDate
        ? new Date(sellDate) - new Date(buyDate)
        : Date.now() - new Date(buyDate);
      timePassedx = timePassedx / 1000;
      timePassedx = toHHMMSS(timePassedx);
      setTimePassed(timePassedx)
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <tr>
      <td>{symbol}</td>
      <td>{buyPrice.toFixed(8)}</td>
      <td>{price}</td>
      <td className={changePercentageClassName}>{changePercentageString}</td>
      <td>{sellPriceFormatted}</td>
      <td className={sellPercentageClassName}>{sellPercentage}</td>
      <td>{timePassed}</td>
    </tr>
  );
}

export default Line;

function toHHMMSS(seconds) {
  let sec_num = parseInt(seconds, 10); // don't forget the second param
  let days = Math.floor(sec_num / ( 3600 * 24));
  let hours = Math.floor((sec_num - (days * 3600 * 24)) / 3600);
  let minutes = Math.floor((sec_num - (days * 3600 * 24) - hours * 3600) / 60);
  let secs = sec_num - (days * 3600 * 24) - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }
  
  days = days ? days + 'g' : '';
  return days + ' ' +  hours + ':' + minutes + ':' + secs;
}
