import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import {Link} from 'react-router-dom';
import axios from'axios';



export class MovieCard extends React.Component{

    render() {
        const {movie} = this.props;
        return (
          <Card border = "dark" className="cardBorder">
            <Card.Header><Card.Title className = "cardTitle">{movie.Title}</Card.Title></Card.Header>
            <Card.Img src={movie.ImagePath} className ="cardIMG"/>
            <Card.Body>
              
              <Card.Text className="cardText">{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button className = 'cardBtn' variant = 'danger'>Open</Button>
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