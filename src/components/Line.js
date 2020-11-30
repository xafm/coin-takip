import React from 'react';

function Line({symbol, buyPrice, price, sellPrice}) {
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

  return (
    <tr>
      <td>{symbol}</td>
      <td>{buyPrice.toFixed(8)}</td>
      <td>{price}</td>
      <td className={changePercentageClassName}>{changePercentage}%</td>
      <td>{sellPriceFormatted}</td>
      <td className={sellPercentageClassName}>{sellPercentage}</td>
    </tr>
  );
}

export default Line;
