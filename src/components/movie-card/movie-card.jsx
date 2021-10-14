import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import {Link} from 'react-router-dom';



export class MovieCard extends React.Component{
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
          </Link>
          {/* <Button variant = "danger" onClick={() => onMovieClick(movie)} variant="danger" className="cardBtn">Open</Button> */}
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