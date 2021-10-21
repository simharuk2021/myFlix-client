import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import Card from'react-bootstrap/Card';
import Image from'react-bootstrap/Image';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
export class MovieView extends React.Component{

    render() {
      
        const {movie, onBackClick} = this.props;

        return (

          
          <Card>
            <div className = "movie-view">
                  <div className = "movie-poster">
                    <img className = "movieIMG" src ={movie.ImagePath} fluid/>
                  </div>
            <Card.Header>
                  <div className = "movie-title">
                    <span className = "label">Title: </span>
                    <span className = "value">{movie.Title}</span>
                  </div>
            </Card.Header>
              <Card.Body>
                  <div className = "movie-description">
                    <span className = "label">Description: </span>
                    <span className = "value">{movie.Description}</span>
                  </div>
                  <div className = "movie-director">
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant = 'link'>Director: </Button>
                      <span className = "value">{movie.Director.Name}</span>
                    </Link>
                  </div>
                  <div className = "movie-genre">
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button variant ='link'>Genre: </Button>
                      <span className = "value">{movie.Genre.Name}</span>
                    </Link>
                  </div>
                    <Button variant ="danger" onClick={() => {onBackClick(null);}} className ="movieBack">Back</Button>
                </Card.Body>
            </div>
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