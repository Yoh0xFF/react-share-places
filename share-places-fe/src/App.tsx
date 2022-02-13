import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LoadingSpinner from './ui/shared/components/ui-elements/LoadingSpinner';
import { AuthContext } from './ui/shared/context/auth-context';

import MainNavigation from '@app/ui/shared/components/navigation/MainNavigation';
import { useAuth } from '@app/ui/shared/hooks/auth-hook';

const Auth = React.lazy(() => import('./ui/users/pages/Auth'));
const Users = React.lazy(() => import('./ui/users/pages/Users'));
const UserPlaces = React.lazy(() => import('./ui/places/pages/UserPlaces'));
const NewPlace = React.lazy(() => import('./ui/places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./ui/places/pages/UpdatePlace'));

function App(): JSX.Element {
  const { isLoading, userId, token, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />

        <Route path='/:userId/places' element={<UserPlaces />} />

        <Route path='/places' element={<UserPlaces />} />

        <Route path='/places/new' element={<NewPlace />} />

        <Route path='/places/:placeId' element={<UpdatePlace />} />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Users />} />

        <Route path='/:userId/places' element={<UserPlaces />} />

        <Route path='/auth' element={<Auth />} />

        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    );
  }

  return (
    <>
      {!isLoading && (
        <AuthContext.Provider
          value={{ isLoggedIn: !!token, userId, token, login, logout }}
        >
          <BrowserRouter>
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <div className='center'>
                    <LoadingSpinner />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </main>
          </BrowserRouter>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
