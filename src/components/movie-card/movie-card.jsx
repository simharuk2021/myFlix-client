import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export class MovieCard extends React.Component{
    render() {
        const {movie, onMovieClick} = this.props;
        return (
                 <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant = "primary" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
        );
        // <div onClick ={() => onMovieClick (movie)} className ="movie-card">{movie.Title}</div>);
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.array,
        Director: PropTypes.array
    }).isRequired, onMovieClick: PropTypes.func.isRequired
};