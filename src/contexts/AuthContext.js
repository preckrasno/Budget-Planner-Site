import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

console.log('AuthContext.js \nAuthContext file in use')
const AuthContext = React.createContext()

export function useAuth() {
    console.log("AuthContext.js \nuseAuth() function in use")
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    console.log("AuthContext.js \nAuthProvider() function in use")
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        console.log("AuthContext.js \nsignup() function in use")
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        console.log("AuthContext.js \nlogin() function in use")
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        console.log("AuthContext.js \nlogout() function in use")
        return auth.signOut()
    }

    function resetPassword(email) {
        console.log("AuthContext.js \nresetPassword() function in use")
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        console.log("AuthContext.js \nupdateEmail() function in use")
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        console.log("AuthContext.js \nupdatePassword() function in use")
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
