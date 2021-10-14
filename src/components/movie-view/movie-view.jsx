import React from 'react';
import { MainView } from '../main-view/main-view';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import Card from'react-bootstrap/Card';
import Image from'react-bootstrap/Image';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
export class MovieView extends React.Component{

// keypressCallback(event){
//     console.log(event.key);
// }

// componentDidMount() {
//     document.addEventListener('keypress', this.keypressCallback);
//   }

//     componentWillUnmount() {
//     document.removeEventListener('keypress', this.keypressCallback);
//   }

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
            <span className = "label">Director: </span>
            <span className = "value">{movie.Director[0].Name}</span>
        </Link>
            </div>
            <div className = "movie-genre">
        <Link to={`/genres/${movie.Genre.Name}`}>
            <span className = "label">Genre: </span>
            <span className = "value">{movie.Genre[0].Name}</span>
        </Link>
            </div>
            <Button variant ="danger" onClick={() => {onBackClick(null);}} className ="movieBack">Back</Button>
            </Card.Body>
            </div>
            </Card>
        );       
    }
}