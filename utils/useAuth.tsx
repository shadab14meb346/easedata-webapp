import React from 'react';
import { AuthContext } from './authContext';

const useAuth = (): any => {
  const context = React.useContext(AuthContext);
  return context;
};

export default useAuth;
