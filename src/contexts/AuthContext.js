import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

console.log('AuthContext file in use')
const AuthContext = React.createContext()

export function useAuth() {
    console.log("using useAuth() function")
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    console.log("AuthProvider in use")
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        console.log("signup in use")
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        console.log("login in use")
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        console.log("logout in use")
        return auth.signOut()
    }

    function resetPassword(email) {
        console.log("resetPassword in use")
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        console.log("updateEmail in use")
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        console.log("updatePassword in use")
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
