import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch (err) {
            setError('Failed to log out')
        }


    }

    return (
        <>
            <Card>
                <Card.Body style={{width: '300px'}}>
                    <h2>Profile</h2>
                    <br/>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <p/>
                    <Link to="/update-profile" >Update Profile</Link>
                </Card.Body>

            </Card>
            <div>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
