import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Places from '@app/ui/places/pages/Places';
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

            <Route path='/places' element={<Places />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
