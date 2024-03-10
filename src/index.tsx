import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { offers } from './mocks';
import {store} from './store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} />
    </Provider>
  </React.StrictMode>
);
