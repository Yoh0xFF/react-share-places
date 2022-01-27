import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Users from "@app/ui/users/pages/Users";
import Places from "@app/ui/places/pages/Places";

function App(): JSX.Element {
  return (
    <div>
      <h1>Let's start!</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Users/>}>

          </Route>
          <Route path='/places' element={<Places/>}>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
