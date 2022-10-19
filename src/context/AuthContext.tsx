import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { useState, useEffect, createContext } from 'react';
import { auth } from 'src/firebase-config';

const initialState = {
  user: null,
};

interface ContextDefaultValue {
  user: any | null;
  registerEmailPassword: (arg0: string, arg1: string) => Promise<string>;
  loginEmailPassword: (arg0: string, arg1: string) => Promise<string>;
  loginWithGoogle: any;
  logout: VoidFunction;
}

export const AuthContext = createContext<ContextDefaultValue>({
  ...initialState,
  registerEmailPassword: async () => '',
  loginEmailPassword: async () => '',
  loginWithGoogle: async () => '',
  logout: () => null,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({});

  const registerEmailPassword = async (
    registerEmail: string,
    registerPassword: string
  ) => {
    let response;
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      response = 'SUCCESS';
    } catch (error) {
      response = error.message;
    }
    return response;
  };

  const loginEmailPassword = async (
    loginEmail: string,
    loginPassword: string
  ) => {
    let response;
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      response = 'SUCCESS';
    } catch (error) {
      response = error.message;
    }
    return response;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    let response;
    try {
      await signInWithRedirect(auth, provider);
      response = 'SUCCESS';
    } catch (error) {
      response = error.message;
    }
    return response;
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerEmailPassword,
        loginEmailPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
