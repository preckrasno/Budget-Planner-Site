import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import app from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import "firebase/database"

export default function InputUserWalletTransaction() {
    const { currentUser } = useAuth()
    const numberRef = useRef()
    const operationTypeRef = useRef()

    async function sendUserTransactionInfo (e) {
        e.preventDefault()

        const todoRef = app.database().ref('Todo')
        console.log(todoRef)

        const todo = {
            "123" : "321",
            complete: "123"
        }

        todoRef.push(todo)
        console.log(todoRef)
        

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
