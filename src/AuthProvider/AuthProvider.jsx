import { createContext, useEffect, useState } from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { Bounce, toast } from "react-toastify";

export const firebaseContext = createContext(null)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

    // create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const update = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign in user
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in using google
  const googleSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign in using github
  const githubSignIn = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };

  // sign out
  const userSignOut = () => {
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    }) 
    return () => unsubscribe()
  },[])

  const notifyError = (message = "Something went wrong. Please  try again") => {
   return toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const values = {
        createUser,
        update,
        notifyError,
        githubSignIn,
        googleSignIn,
        user,
        setUser,
        loader,
        loginUser,
        userSignOut,
    }

    return (
        <firebaseContext.Provider value={values}>
            {children}
        </firebaseContext.Provider>
    );
};

export default AuthProvider;