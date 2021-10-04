import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
export function RegistrationView (props){
    const[ username, setUsername] = useState('');
    const[ password, setPassword] = useState('');
    const[ email, setEmail] = useState('');
    const[ birthday, setBirthday] = useState ('');


    const handleSubmit = (e) => {
e.preventDefault();
console.log(username, password, email, birthday);

props.onRegistration(username);

    };
    
    return (
        <Form>
    <Form.Group controlId = "formUsername">
    <Form.Label>Username: </Form.Label>
    <Form.Control type = "text" onChange={e => setUsername(e.target.value)}/>    
    </Form.Group>

    <Form.Group controlId = "pasword">
    <Form.Label>Password:</Form.Label>
     <Form.Control type = "password" onChange={e => setPassword(e.target.value)}/>    
    </Form.Group>
    <label>
    Email:
    <input type = "email" value = {email} onChange={e => setEmail(e.target.value)}/>    
    </label>
    <label>
    Birthday:
    <input type = "birthday" value = {birthday} onChange={e => setBirthday(e.target.value)}/>    
    </label>

    <button type ="submit" onClick={handleSubmit}>Register</button>
    </Form>
    );
   }

   RegistrationView.propTypes = {
       register: PropTypes.shape ({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
       }),
       onRegistration: PropTypes.func.isRequired,
   };