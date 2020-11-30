import createDataContext from './createDataContext';
import data from '../data/coins.json' 

const reducer = (state, action) => {
  switch (action.type) {
    case 'on_price_change':
      state.find(c => c.symbol === action.payload.coin)['price'] =
        action.payload.price;
      return [...state];
    default:
      return state;
  }
};
const onPriceChange = dispatch => (coin, price) => {
  dispatch({type: 'on_price_change', payload: {coin, price}});
};

const {Context, Provider} = createDataContext(
  reducer,
  {onPriceChange},
  data
);

export {Context, Provider};
