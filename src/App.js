import React from 'react';
import { HashRouter, Route, BrowserRouter } from 'react-router-dom'

import RootView from './views/RootView'

import './styles/index.css';


function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={RootView}></Route>
    </BrowserRouter>
  );
}
export default App;
