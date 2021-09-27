import React from 'react';
import axios from'axios';
import {LoginView} from '../login-view/login-view';
import {MovieCard } from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
export class MainView extends React.Component {

    constructor(){
        super();
        //State is initiliased to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

//code below inegrates with the API information hosted by heroku (linked to MongoDB Atlas)
componentDidMount(){
    axios.get('https://my-movies-souperapp.herokuapp.com/movies')
    .then(response => {
        this.setState({
            movies: response.data
        });
    })
    .catch(error => {
        console.log(error);
    });
}


//below code invokes a function which updates the state of selectedMovie to the specific movie 
setSelectedMovie(newSelectedMovie) {
    this.setState({
        selectedMovie: newSelectedMovie,
    });
}

//the function updates the user property to the specific user

onLoggedIn(user) {
    this.setState({user});
}

    render() {
        const {movies, selectedMovie} = this.state;

//If there is no user the LoginView is rendered.  If a user logs in the user details are passed as a prop to LoginView
        if (!user) return<LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;


        if (movies.length === 0){
            return <div className="main-view" />; 
            
        } else {
            return (
            <div className = "main-view">
            {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie);}}/>:
            movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />))
            }
                </div>
                );
            }
    }
}