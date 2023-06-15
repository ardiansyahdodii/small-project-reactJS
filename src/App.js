import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavbarComponent from './components/NavbarComponent.js'
import Home from './pages/Home.js'
import Sukses from './pages/Sukses.js'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
        
      </BrowserRouter>

    )
  }
}
