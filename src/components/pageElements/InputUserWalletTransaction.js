import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import app from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import "firebase/database"

export default function InputUserWalletTransaction() {
    const { currentUser } = useAuth()
    console.log(`currentUser = ${JSON.stringify(currentUser)}`)
    console.log(`currentUser.email = ${JSON.stringify(currentUser.email)}`)
    const numberRef = useRef()
    const operationTypeRef = useRef()

    async function sendUserTransactionInfo (e) {
        e.preventDefault()

        
    console.log(`currentUser = ${JSON.stringify(currentUser)}`)
    console.log(`currentUser.email = ${JSON.stringify(currentUser.email)}`)

        const todoRef = app.database().ref(currentUser.uid)

        const todo = {
            email : currentUser.email.toString(),
            userTransactionValue : numberRef.current.value,
            userTransactionType : operationTypeRef.current.value
        }

        todoRef.push(todo)
        
    }

    return (
        <div 
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
        >
        <Form onSubmit={sendUserTransactionInfo}>
        <Form.Group id="number">
                <Form.Label>how much money</Form.Label>
                <Form.Control type="number" ref={numberRef} required />
            </Form.Group>
            <Form.Group id="operationType">
                <Form.Label>Choose operation type</Form.Label>
                <Form.Control as="select" ref={operationTypeRef} >
                    <option>Spending</option>
                    <option>Earning</option>
                </Form.Control>
            </Form.Group>
                <Button type="submit">Submit</Button>   
        </Form>
        </div>
    )
}
