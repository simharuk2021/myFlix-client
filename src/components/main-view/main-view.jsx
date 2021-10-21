import React from 'react';
import axios from'axios';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {LoginView} from '../login-view/login-view';
import {MovieCard } from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
// import Container from 'react-bootstrap/Container';
import {NavBar} from '../nav-bar/nav-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
export class MainView extends React.Component 
{     

    constructor()
    {
        super();
        //State is initiliased to null
        this.state = 
        {
            movies: [],
            selectedMovie: null,
            user: null,
            registered:null
        };
    }

    getMovies(token) 
    {
        axios.get('https://my-movies-souperapp.herokuapp.com/movies', 
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

//code below integrates with the API information hosted by heroku (linked to MongoDB Atlas)
    componentDidMount()
    {let accessToken=localStorage.getItem('token');
    if (accessToken !== null) 
        {this.setState
        ({user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        }

    }

//below code invokes a function which updates the state of selectedMovie to the specific movie 
    // setSelectedMovie(newSelectedMovie) 
    // {this.setState(
    //     {selectedMovie: newSelectedMovie,
    //     });
    // }

//the function updates the user property to the specific user

    // onRegistration(registered) 
    // {this.setState(
    //     {registered,
    //     });
    // }

    onLoggedIn(authData) 
    {console.log(authData);
    this.setState({user: authData.user.Username});
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    }

    // toggleRegisterView(e) 
    // {
    //     e.preventDefault();
    //     this.setState(
    //         {registered: !this.state.registered,
    //         user: !this.state.user
    //         });
    // }

    onLoggedOut() 
        {localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState(
            {
        user: null
            });
        }

    render() {
      
    const { movies, user } = this.state;
    return (
        
      <Router>
      <NavBar/>
      {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */}
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}