import React from "react";
import axios from "axios";
import {  Form,  Button,  Row,  Col,  Card, Container, } from "react-bootstrap";
import {setState} from 'react';
import { PropTypes } from 'prop-types';
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://my-movies-souperapp.herokuapp.com/users/${username}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      }
  

  render() {
   const {user, onBackClick} = this.props;
   console.log(user);

    return ( 
      <Container>
        <Card className = "profile-view">
        <Card.Header>
        <div className = "username">
        <span className = "label">Username: </span>
        <span className = "value">{this.state.Username}</span>
        </div>
        </Card.Header>
        <Card.Body>
        <div className = "Password">
        <span className = "label">Password: </span>
        <span className = "value">******</span>
        </div>
        <div className = "Email">
        <span className = "label">Email: </span>
        <span className = "value">{this.state.Email}</span>
        </div>
        <div className = "Birthday">
        <span className = "label">Birthday: </span>
        <span className = "value">{this.state.Birthday}</span>
        </div>
        <div className = "Favorite-Movies">
        <span className = "label">Favorite Movies: </span>
        <span className = "value">{this.state.FavoriteMovies[MovieCard._id]}</span>
        </div>
        
        <Button variant ="danger" onClick={() => {onBackClick(null);}}>Back</Button>
        <span>
        <Button href = "/update"variant ="primary">Update User Details</Button>
        </span>
        </Card.Body>
        </Card>
        </Container>
    );       
}
}
ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array
  })
};