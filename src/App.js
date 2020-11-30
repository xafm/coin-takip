import logo from './bitcoin.png';
import './App.css';
import useSocket from '../src/hooks/useSocket';
import {useEffect, useContext} from 'react';
import {Provider as CoinPriceProvider} from './context/CoinPriceContext';
import {Context as CoinPriceContext} from './context/CoinPriceContext';
import Table from './components/Table';

function App() {
  const {state} = useContext(CoinPriceContext);
  const [connected, subscribe] = useSocket();

  useEffect(() => {
    let ms = 0;
    if (connected) {
      for (const coin of state) {
        ms += 1000
        setTimeout(() => {
          subscribe({
            symbol: coin.symbol,
            type: 'trade',
          });
        }, ms);

      }
    }
  }, [connected]);

  return (
    <div className="App">
      <header >
        <img src={logo} className="App-logo" alt="logo" />

        <Table data={state} />
      </header>
    </div>
  );
}

export default () => {
  return (
    <div className="App-header">
      <CoinPriceProvider>
        <App />
      </CoinPriceProvider>
    </div>
  );
};
