import {useState, useContext} from 'react';
import {Context} from '../context/CoinPriceContext';
const url = 'wss://stream.binance.com:9443/ws/CELRBTC@trade';
const connection = new WebSocket(url);

const useSocket = () => {
  const {state, onPriceChange} = useContext(Context);
  const [connected, setConnected] = useState(false)

  connection.onopen = () => {
    setConnected(true)
    console.log('Streaming ready!');
  };

  connection.onmessage = e => {
    let data = JSON.parse(e.data);

    if (data.e === 'kline') {
      console.log(
        'Coin:',
        data.s,
        'Mum aralığı:',
        data.k.i,
        'Mum acilis saati:',
        data.k.t,
        'Mum kapanis saati:',
        data.k.T,
        'İşlem sayisi:',
        data.k.n,
        'Hacim:',
        data.k.v,
      );
    }

    if (data.e === 'trade' || data.e === 'aggTrade') {
      onPriceChange(data.s, data.p)
      //   const {onTrade} = require('./logic/buyAndTraceDemo');
      //   onTrade(data.s,data.p)
      //   // console.log(
      //   //   "Coin:",
      //   //   data.s,
      //   //   "Fiyat:",
      //   //   data.p,
      //   //   "Miktar:",
      //   //   data.q,
      //   //   "İşlem saati:",
      //   //   new Date(data.E)
      //   // );
    }
  };

  connection.onerror = error => {
    console.log(`WebSocket error: ${error.message}`);
  };

  connection.onclose = e => {
    console.log('closed');
    console.log(e);
  };

  // "arpabtc@kline_1m", "arpabtc@trade", "cosbtc@trade", 'cosbtc@kline_1m', "btcusdt@kline_1m"
  const subscribe = ({symbol, type}) => {
    if (connection.readyState !== 1) {
      throw new Error('Bağlantı yok');
    }
    symbol = symbol.toLowerCase();
    console.log('Subscribing', symbol, type);
    connection.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: [`${symbol}@${type}`],
        id: 1,
      }),
    );
  };

  const unsubscribe = (symbol, type) => {
    if (connection.readyState !== 1) {
      throw new Error('Bağlantı yok');
    }
    symbol = symbol.toLowerCase();
    console.log('Unsubscribing', symbol, type);
    connection.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [`${symbol}@${type}`],
        id: 1,
      }),
    );
  };

  return [connected, subscribe, unsubscribe];
};

export default useSocket;
