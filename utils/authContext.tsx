import React from 'react';

const AuthContext: any = React.createContext({});
const { Provider } = AuthContext;

const AuthProvider = ({ children, value }: any) => {
  return <Provider value={value}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
