import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from './provider';

function PrivateRoute() {
  const[store] = useContext(Context)

  return (
    store.user.token ? <Outlet/> : <Navigate to="/Login"/>
  );
}

export default PrivateRoute;