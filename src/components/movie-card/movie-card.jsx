import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import {Link} from 'react-router-dom';
import axios from'axios';



export class MovieCard extends React.Component{

  
  addMovie(token) 
  {
      const username = localStorage.getItem("user"); 
      axios.post(`https://my-movies-souperapp.herokuapp.com/users/${username}/FavoriteMovies/${Movie.id}`, 
      {
      headers: {Authorization: `Bearer ${token}`}
      })
  .then (response => 
      {
      //assign the result to the state
      this.setState
          ({
          movies: response.data
          });
      })
  .catch(function (error) 
      {
      console.log(error);
      });
  }

    render() {
        const {movie} = this.props;
        return (
          <Card border = "dark" className="cardBorder">
            <Card.Img variant="top"  src={movie.ImagePath} className ="cardIMG"/>
            <Card.Body>
              <Card.Header><Card.Title className = "cardTitle">{movie.Title}</Card.Title></Card.Header>
              <Card.Text className="cardText">{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant = 'danger'>Open</Button>
                  <br></br>
                  <Button variant = 'success'onClick={() => this.addMovie()}>Add to Favorites</Button>
                </Link>
            </Card.Body>
          </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
          Name: PropTypes.string,
          Description: PropTypes.string}),
        Director: PropTypes.shape({
          Name: PropTypes.string,
          Bio: PropTypes.string,
          Birth: PropTypes.string
        }),  
        }).isRequired, onMovieClick: PropTypes.func.isRequired
};