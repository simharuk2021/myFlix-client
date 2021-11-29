import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import axios from 'axios';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

export function LoginView (props){
    const[ username, setUsername] = useState('');
    const[ password, setPassword] = useState('');

    const handleSubmit = (e) => {
e.preventDefault();
console.log(username, password);
axios.post('https://my-movies-souperapp.herokuapp.com/login', {
    Username: username,
    Password: password
})
 .then(response => {
    const data = response.data;
props.onLoggedIn(data);
alert('login successfull');
 })
 .catch (e => {
    console.log(e)
 });
    };
    
    return (
    <Form className ="loginForm">
    <Form.Group controlId="formUsername">
    
    <Form.Label>Username:</Form.Label>
    <Form.Control type = "text" onChange={e => setUsername(e.target.value)}/>    
    </Form.Group>
    
    <Form.Group controlId="formPassword">
     <Form.Label>Password:</Form.Label>
    <Form.Control type = "password" onChange={e => setPassword(e.target.value)}/>    
    </Form.Group>
    <Button variant = "danger" type = "submit" onClick={handleSubmit}>Submit</Button>
    <p>New User? Register here</p>
    <Link to="/register">
        <Button variant="primary" type="button">Register</Button>
    </Link>
    </Form>

    );
   }
const mapDispatchToProps= (dispatch) => ({handleSubmit: (username, password)=> dispatch(handleSubmit(username, password))
});

   export default connect(mapDispatchToProps)(LoginView);