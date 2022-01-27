import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Users from '@app/ui/users/pages/Users';
import Places from '@app/ui/places/pages/Places';

function App(): JSX.Element {
  return (
    <div>
      <h1>Let&apos;s start!</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />

          <Route path='/places' element={<Places />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
