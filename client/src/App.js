import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
};

export default App;
