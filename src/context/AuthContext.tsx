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

interface ContextDefaultValue {
  user: any | null;
  registerEmailPassword: (arg0: string, arg1: string) => void;
  loginEmailPassword: (arg0: string, arg1: string) => void;
  logout: VoidFunction;
}

export const AuthContext = createContext<ContextDefaultValue>({
  ...initialState,
  registerEmailPassword: () => null,
  loginEmailPassword: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({});

  const registerEmailPassword = async (
    registerEmail: string,
    registerPassword: string
  ) => {
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

  const loginEmailPassword = async (
    loginEmail: string,
    loginPassword: string
  ) => {
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
