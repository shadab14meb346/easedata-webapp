import { IAuthState } from 'pages/_app';
import React from 'react';
import { AuthContext } from './authContext';

interface IAuthContextType {
  authState: IAuthState;
  setAuthState: (authState: IAuthState) => {};
}
const useAuth = () => {
  const context = React.useContext(AuthContext) as IAuthContextType;
  return context;
};

export default useAuth;
