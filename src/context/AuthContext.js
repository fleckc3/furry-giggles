import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect, createContext } from "react";
import { auth } from "src/firebase-config";

const initialState = {
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  registerEmailPassword: () => null,
  loginEmailPassword: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const registerEmailPassword = async (registerEmail, registerPassword) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginEmailPassword = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerEmailPassword,
        loginEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
