import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Page/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseContext } from "./Firebase/context";
import { firebase } from "./Firebase/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase }}>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </Router>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

