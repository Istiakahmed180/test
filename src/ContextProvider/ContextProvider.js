import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../Firebase/Firebase.config";

export const AuthProvider = createContext();

const auth = getAuth(app);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unSubscribed();
    };
  }, []);

  return (
    <AuthProvider.Provider
      value={{ signUpUser, signInUser, user, signOutUser }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default ContextProvider;
