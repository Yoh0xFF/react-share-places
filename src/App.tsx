import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from "@ui/users/pages/Users";
import Places from '@ui/places/pages/Places';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Users/>}>

        </Route>
        <Route path='/places' element={<Places/>}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
