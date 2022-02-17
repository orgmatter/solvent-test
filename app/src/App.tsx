import React, {} from 'react';
import {  Home } from './views/Home';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { routeProps } from './helpers/routes';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/"  element={<Home />} />
            {
              routeProps.map((routeProp, index) => {

                return (
                  <Route path={routeProp.link} element={<routeProp.component {...routeProp}/>} key={index} />
                )
              })
            }
        </Routes>
    </Router>
  );
}

export default App;
