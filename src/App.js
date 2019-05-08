import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {AppRouter} from "./App.router";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faBell, faClock } from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faBell, faClock, faChartPie);

class App extends Component {
  render() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route component={AppRouter}/>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
