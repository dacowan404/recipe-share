import React, { createContext, useState } from 'react';

export const UserContext = createContext(0);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={ {user, setUser} }>
      {children}
    </UserContext.Provider>
  );
};