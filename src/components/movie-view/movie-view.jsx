import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import Card from'react-bootstrap/Card';
import Image from'react-bootstrap/Image';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import axios from'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export class MovieView extends React.Component{

  addFavorite(movie) {
    const token = localStorage.getItem('token');
    let url = "https://my-movies-souperapp.herokuapp.com/users/" + localStorage.getItem('user')
        + "/FavoriteMovies/" + movie._id;
        console.log(url);
    axios
        .post(url, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            alert("Movie was added to favorites");
            this.componentDidMount();
        });
}

    render() {
      
        const {movie, onBackClick} = this.props;
       return (

          <Card>
               <Card.Header>
                  <div className = "movie-title">
                    <span className = "label">Title: </span>
                    <span className = "value">{movie.Title}</span>
                  </div>
            </Card.Header>
              <Card.Body>
                <Row>
                  <div className = "movie-poster">
                    <img className = "movieIMG" src ={movie.ImagePath} fluid/>
                  </div>
                
              <div className = "movie-buttons">
                    <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant ='secondary' className = "movie-buttons">Director Name: {movie.Director.Name}</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button variant ='secondary' className = "movie-buttons">Genre Name: {movie.Genre.Name}</Button>
                    </Link>
                  </div>
                  </Row>
                  <div className = "movie-description">
                    <div className = "label">Description: </div>
                    <span className = "movie-description">{movie.Description}</span>
                  </div>
                    <div className="bottomButtons">
                    <Button className ="backButton" variant ="danger" onClick={() => {onBackClick(null);}}>Back</Button>
                    <Button className="favButton" variant="dark" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
                    </div>
                </Card.Body>
            
          </Card>
        );       
    }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired
};