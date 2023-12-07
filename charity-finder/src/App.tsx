// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom';
import CharityList from './components/CharityList';
import CharityDetails from './components/CharityDetails';
import Favorites from './components/Favorites';
import SearchComponent from './components/SearchComponent';

const App: React.FC = () => {
  return (
     
    <Router>
      <Routes>
        <Route path="/" element={<CharityList/>} />
        
        <Route path="/charity/:uin" element={<CharityDetails/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/search" element={<SearchComponent/>} />
      </Routes>
  
    </Router>
  );
};


export default App;
