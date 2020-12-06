import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [typedEmailUpdated, setTypedEmailUpdated] = useState(true)
    const history = useHistory()

    function handleChange(e) {
        if (emailRef.current.value !== currentUser.email) {
            setTypedEmailUpdated(false)
        }
        else {
            setTypedEmailUpdated(true)
        }
    }

    function handleSubmitEmail(e) {
        e.preventDefault()

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((error) => {
            setError(`Failed to update Email \n${error}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    function handleSubmitPassword(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((error) => {
            setError(`Failed to update Password \n${error}`)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="w-100 text-center mb-4">Update Profile</h2>
                    <p />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmitEmail}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} onChange={handleChange} />
                        </Form.Group>
                        <Button className="w-100" disabled={loading || typedEmailUpdated} type="submit">
                            Update Email
                        </Button>
                        <p />
                    </Form>
                    <Form onSubmit={handleSubmitPassword}>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder='Enter new password' />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder='Enter new password' />
                        </Form.Group>
                        <Button className="w-100" disabled={loading} type="submit">
                            Update Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <p />
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}
