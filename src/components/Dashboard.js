import React from 'react'
import NavBar from './pageElements/NavBar'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    
    const { currentUser } = useAuth()
    return (
        <div>
        <NavBar/>
        </div>
    )
}
