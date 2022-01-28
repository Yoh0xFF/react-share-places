import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import UserPlaces from '@app/ui/places/pages/UserPlaces';
import MainNavigation from '@app/ui/shared/components/navigation/MainNavigation';
import Users from '@app/ui/users/pages/Users';

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            <Route path='/' element={<Users />} />

            <Route path='/:userId/places' element={<UserPlaces />} />

            <Route path='/places' element={<UserPlaces />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
