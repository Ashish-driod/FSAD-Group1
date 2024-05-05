import React, { createContext, useContext, useState } from 'react';

// Create a new context for user credentials
const UserCredentialContext = createContext();

// Custom hook to use the user credential context
export const useUserCredential = () => useContext(UserCredentialContext);

// Provider component to manage the user credential state
export const UserCredentialProvider = ({ children }) => {
  const [userCredential, setUserCredential] = useState(null);

  return (
    <UserCredentialContext.Provider value={{ userCredential, setUserCredential }}>
      {children}
    </UserCredentialContext.Provider>
  );
};