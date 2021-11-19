import React from "react";
import axios from "axios";
import {  Form,  Button,  Row,  Col,  Card, Container, } from "react-bootstrap";
import {setState} from 'react';
import { PropTypes } from 'prop-types';
import { Link } from "react-router-dom";
// import { MovieCard } from "../movie-card/movie-card";
import './profile-view.scss';

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

      removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://my-movies-souperapp.herokuapp.com/users/' + localStorage.getItem('user')
            + '/FavoriteMovies/' + movie._id;
        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Movie was removed");
                this.componentDidMount();
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
               
        <Button variant ="danger" onClick={() => {onBackClick(null);}}>Back</Button>
        <span>
        <Button href = "/update"variant ="primary">Update User Details</Button>
        </span>
        </Card.Body>
        </Card>
        <Card className="cardFav">
        <div className = "Favorite-Movies">
        <Card.Header><span className = "label">Favorite Movies: </span></Card.Header>
        <Row>
          {this.state.FavoriteMovies.map((movie) => { 
            return (           
            <Row>
              <Col xs={2} md={4} lg ={6} xl={12}>
                {movie.Title}
                <Card.Img src={movie.ImagePath} />
              <Button variant="dark" onClick={() => this.removeFavorite(movie)}>Click to Remove</Button>
              </Col>
            </Row>) 
          }
          )}
        </Row>
        </div>
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
    FavoriteMovies: PropTypes.array.isRequired
  })
};