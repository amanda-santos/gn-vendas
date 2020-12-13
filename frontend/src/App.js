import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';

import Routes from './routes';
import './styles.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes />
    </>
  );
}

export default App;