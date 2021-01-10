import React from 'react';
import Line from './Line';
import '../styles/table.css';

function Table({data}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Alış Fiyatı</th>
            <th>Güncel Fiyat</th>
            <th>Değişim %</th>
            <th>Satış Fiyatı</th>
            <th>Kar/Zarar</th>
            <th>Geçen Süre</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin, index) => (
            <Line
              key={index}
              symbol={coin.symbol}
              buyPrice={coin.buyPrice}
              price={coin.price}
              sellPrice={coin.sellPrice}
              buyDate={coin.buyDate}
              sellDate={coin.sellDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
