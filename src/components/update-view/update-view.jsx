import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from "react-router-dom";
import {LoginView} from "../login-view/login-view";

export function UpdateView (user){
    // const Username=props.user.Username;
    const[ userName, setUsername] = useState(user.Username);
    const[ password, setPassword] = useState(localStorage.getItem('password'));
    const[ email, setEmail] = useState(user.Email);
    const[ birthday, setBirthday] = useState (user.birthday);

    
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleUpdate = (e) => {
        e.preventDefault();
     
console.log(user);
    axios.put(`https://my-movies-souperapp.herokuapp.com/users/${username}`, {
        Username: userName,
        Password: password,
        Email: email,
        Birthday: birthday

  }, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => 
    {
    const data = response.data;
    console.log(data);
    alert('user has been updated'); 
  })
    .catch (e => {
    console.log('error updating the user')
  });
};

    
    return (
        <Form>
    <Form.Group controlId = "formUsername">
    <Form.Label>Username: </Form.Label>
    <Form.Control type = "text" required ="true" onChange={e => setUsername(e.target.value)}/>    
    </Form.Group>

    <Form.Group controlId = "pasword">
    <Form.Label>Password:</Form.Label>
     <Form.Control type = "password" required="true" onChange={e => setPassword(e.target.value)}/>    
    </Form.Group>

    <Form.Group controlId = "email">
    <Form.Label>Email: </Form.Label>
    <Form.Control type = "email" required ="true" onChange={e => setEmail(e.target.value)}/>    
    </Form.Group>

    <Form.Group controlId = "birthday">
    <Form.Label>Birthday:</Form.Label>
    <Form.Control type = "birthday" required ="true" onChange={e => setBirthday(e.target.value)}/>    
    </Form.Group>

    <Button variant = "danger" type ="submit" onClick={handleUpdate}>Update</Button>
    </Form>
    );
   }

   UpdateView.propTypes = {
       update: PropTypes.shape ({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
       }),
   };