import React, { Component } from 'react';
// import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailMealPage from './pages/DetailMealPage';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/meal">
            <Route path=":id" element={<DetailMealPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
}

export default App;
