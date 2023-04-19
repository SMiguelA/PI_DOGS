import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ? CONECTAMOS NUESTRA APP DE REACT CON NUESTRO ESTADO GLOBAL DE REDUX
import store from './redux/store/store';
import { Provider } from 'react-redux'; 

// ? importamos BrowserRouter para que funcione el enrutado y rutas de nuestra app
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);


reportWebVitals();
