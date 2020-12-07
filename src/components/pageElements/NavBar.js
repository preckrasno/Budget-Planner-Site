import React, { useState } from 'react'
import { Navbar, Nav, Button, NavDropdown, DropdownButton } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function NavBar() {

    console.log(`NavBar.js
    NavBar function is used`);
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
        <Navbar bg="light" fixed="top">
            <Navbar.Brand href="">Budget Planner</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            {currentUser ? <NavDropdown alignRight title={currentUser.email}>
                {/* <NavDropdown.Item>{currentUser.email}</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item href="">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown> : <Button type="Login" href="/login">Log in</Button>}
            
            
        </Navbar>
    )
}