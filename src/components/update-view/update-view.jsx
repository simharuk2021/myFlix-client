import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from "react-router-dom";
import {LoginView} from "../login-view/login-view";

export function UpdateView (props){
    // const Username=props.user.Username;
    const[ userName, setUsername] = useState('');
    const[ password, setPassword] = useState('');
    const[ email, setEmail] = useState('');
    const[ birthday, setBirthday] = useState ('');
    // setUsername(props.user.Username);
    // setPassword(props.user.Password);
    // setEmail(props.user.Email);
    // setBirthday(props.user.Birthday);
    console.log(props.user);
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

      

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
    // setUsername(data.username)
    alert('user has been updated'); 
  })
    .catch (e => {
    console.log('error updating the user')
    // console.log(userName, password, email, birthday)
  });
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

    <Form.Group controlId = "email">
    <Form.Label>Email: </Form.Label>
    <Form.Control type = "email" onChange={e => setEmail(e.target.value)}/>    
    </Form.Group>

    <Form.Group controlId = "birthday">
    <Form.Label>Birthday:</Form.Label>
    <Form.Control type = "birthday" onChange={e => setBirthday(e.target.value)}/>    
    </Form.Group>

    <Button variant = "danger" type ="submit" onClick={handleSubmit}>Update</Button>
    </Form>
    );
   }

   UpdateView.propTypes = {
       update: PropTypes.shape ({
        username: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
        birthday: PropTypes.string,
       }),
      //  onUpdate: PropTypes.func.isRequired,
   };