import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useReducer, createContext, ReactNode } from 'react';
import LinerLoadingScreen from 'src/components/progress-bar';
import { auth, db } from 'src/firebase-config';

enum Types {
  login = 'LOGIN',
  loginGoogle = 'LOGIN_GOOGLE',
  logout = 'LOGOUT',
  register = 'REGISTER',
  onBoardUser = 'ONBOARD_USER',
  updateProfile = 'UPDATE_PROFILE',
  authIsReady = 'AUTH_IS_READY',
}

export type AuthState = {
  user?: null | User;
  isAuthenticated: boolean;
  isOnBoarded: boolean;
  isAuthReady: boolean;
  registerEmailPassword: (email: string, password: string) => Promise<any>;
  loginEmailPassword: (email: string, password: string) => Promise<any>;
  onBoardUser: (arg0: string, arg1: string) => void;
  loginWithGoogle: () => Promise<any>;
  logout: VoidFunction;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isOnBoarded: false,
  isAuthReady: false,
  registerEmailPassword: async () => '',
  loginEmailPassword: async () => '',
  loginWithGoogle: async () => '',
  onBoardUser: () => '',
  logout: () => null,
};

export const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case Types.login:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isOnBoarded: action.payload.isOnBoarded,
      };
    case Types.loginGoogle:
      return { ...state, user: action.payload, isAuthenticated: true };

    case Types.logout:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isOnBoarded: false,
        isAuthReady: true,
      };
    case Types.register:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isOnBoarded: false,
      };

    case Types.authIsReady:
      return { ...state, user: action.payload, isAuthReady: true };
    case Types.onBoardUser:
      console.log(action);
      return { ...state, isOnBoarded: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  ...initialState,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // console.log(state);

  const registerEmailPassword = async (
    registerEmail: string,
    registerPassword: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        userName: '',
        profileImage: '',
        onBoarded: false,
      });

      dispatch({
        type: Types.register,
        payload: user,
      });

      return 'SUCCESS';
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const loginEmailPassword = async (
    loginEmail: string,
    loginPassword: string
  ) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      const userRef = doc(db, 'users', user.uid);
      const snapShot = await getDoc(userRef);
      const data = await snapShot.data();
      let isOnBoarded = false;
      if (data) {
        const { onBoarded } = data;
        isOnBoarded = onBoarded;
      }

      dispatch({
        type: Types.login,
        payload: { user, isOnBoarded },
      });
      return 'SUCCESS';
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithRedirect(auth, provider);
      dispatch({
        type: Types.loginGoogle,
        payload: user,
      });
      return 'SUCCESS';
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const onBoardUser = async (username: string, url: string) => {
    try {
      await updateProfile(state.user, {
        displayName: username,
        photoURL: url ? url : '',
      });

      const userRef = doc(db, 'users', state.user.uid);
      await updateDoc(userRef, {
        userName: username,
        profileImage: url ? url : '',
        onBoarded: true,
      });

      const isOnBoarded = true;

      dispatch({
        type: Types.onBoardUser,
        payload: isOnBoarded,
      });

      return 'SUCCESS';
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: Types.logout });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      dispatch({ type: Types.authIsReady, payload: currentUser });
    });
  }, []);

  if (!state.isAuthReady) {
    return <LinerLoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerEmailPassword,
        loginEmailPassword,
        loginWithGoogle,
        onBoardUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
