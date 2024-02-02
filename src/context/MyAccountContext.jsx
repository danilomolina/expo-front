import React, { createContext, useState } from 'react';

export const MyAccountContext = createContext();

export const MyAccountProvider = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState('default.jpg');

  const updateUserPhoto = (newPhoto) => {
    setUserPhoto(newPhoto);
  };

  return (
    <MyAccountContext.Provider value={{ userPhoto, updateUserPhoto }}>
      {children}
    </MyAccountContext.Provider>
  );
};
