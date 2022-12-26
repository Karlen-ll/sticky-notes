import React from 'react';
import {createRoot} from 'react-dom/client';

import Main from '@views/Main';
import reportWebVitals from './reportWebVitals';
import './style/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);

reportWebVitals();
