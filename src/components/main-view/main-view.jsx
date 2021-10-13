import React from 'react';
import axios from'axios';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {LoginView} from '../login-view/login-view';
import {MovieCard } from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
export class MainView extends React.Component {

    constructor(){
        super();
        //State is initiliased to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered:null
        };
    }

getMovies(token) {
    axios.get('https://my-movies-souperapp.herokuapp.com/movies', {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then (response => {
        //assign the result to the state
        this.setState({
            movies: response.data
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

//code below integrates with the API information hosted by heroku (linked to MongoDB Atlas)
componentDidMount(){
    let accessToken=localStorage.getItem('token');
    if (accessToken !== null) {
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
    }
}
//     axios.get('https://my-movies-souperapp.herokuapp.com/movies')
//     .then(response => {
//         this.setState({
//             movies: response.data
//         });
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }

//below code invokes a function which updates the state of selectedMovie to the specific movie 
setSelectedMovie(newSelectedMovie) {
    this.setState({
        selectedMovie: newSelectedMovie,
    });
}

//the function updates the user property to the specific user

onRegistration(registered) {this.setState({
    registered,
});
}

onLoggedIn(authData) {
    console.log(authData);
    this.setState({user: authData.user.Username});
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    }

toggleRegisterView(e) {
        e.preventDefault();
        this.setState({
            registered: !this.state.registered,
            user: !this.state.user
        });
    }

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

    render() {
        const {movies, selectedMovie, user, registered} = this.state;

//If there is no registered user the registration view is rendered.  If a user registers in registration details are passed as a prop to RegistrationView
        if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} clickHandler={(e) => this.toggleRegisterView(e)} />;
//If there is no identified user then the login view is rendered and the user details are passed as a prop to LoginView
        if (!user)
        return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        if (movies.length === 0){
            return <div className="main-view" />; 
            
        } else {
            return (
                <Router>
                <Container>
                <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                        {selectedMovie ? (
                            <Row className = "main-view justify-content-md-center">
                            <Col md={6}>
            <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie);}}/>
            </Col>
            </Row>)
            : (<Row className = "justify-content-md-centre">
            <Route exact path ="/" render={() => {
                return movies.map(movie => 
            (<Col xl = {3} lg ={4} md={6} sm={12}>
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            </Col>))
            }}/>

            <Route path="/movies/:movieID" render={({match}) => {
                return <Col md={8}>
                <MovieView movie={movies.find(movie=>movie.id === match.params.movieID)}/>
                </Col>
            }} />
            <Route path="/directors/:name" render={({ match }) => {
  if (movies.length === 0) return <div className="main-view" />;
  return <Col md={8}>
    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
  </Col>
}
} />
            
                </Row>)
        }
           </Container>      
           </Router>
                );
            }
    }
}