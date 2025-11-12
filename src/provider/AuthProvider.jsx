import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => signOut(auth);

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const updateUserProfile = (name, photoURL) => updateProfile(auth.currentUser, { displayName: name, photoURL });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        logout,
        resetPassword,
        updateUserProfile
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
