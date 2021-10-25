import React from 'react';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import Card from'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
export class DirectorView extends React.Component{

// keypressCallback(event){
//     console.log(event.key);
// }

// componentDidMount() {
//     document.addEventListener('keypress', this.keypressCallback);
//   }

//     componentWillUnmount() {
//     document.removeEventListener('keypress', this.keypressCallback);
//   }

constructor()
    {
        super();
        //State is initiliased to null
        this.state = 
        {
            director: null,
                };
    }

getDirector(token) 
{
//     axios.get(`https://my-movies-souperapp.herokuapp.com/directors/${this.props.director.Name}`, 
//     {
//     headers: {Authorization: `Bearer ${token}`}
//     })
// .then (response => 
//     {
//     //assign the result to the state
//     this.setState
//         ({
//         director: response.data
//         });
//         console.log(this.state);
//     })
// .catch(function (error) 
//     {
//     console.log(error);
//     });
this.setState({director: {
    "_id": "6137420e6af4f5693de54a43",
    "Name": "Jonathan Frakes",
    "Bio": "Jonathan Scott Frakes was born on August 19, 1952 in Bellefonte, in central Pennsylvania. He is the son of Doris J. (Yingling) and Dr. James R. Frakes, a professor. His parents moved with Jonathan and his younger brother Daniel to Bethlehem in eastern Pennsylvania. There, his father taught English at Lehigh University, where he held the Fairchild chair in American Literature until his passing in 2002. Frakes is of German, and some English, ancestry. Jonathan also stars in the Star Trek Series as number one for Patrick Stewart's character Picard",
    "Birth": "1952",
    "Death": ""
}})
}

componentDidMount()
    {let accessToken=localStorage.getItem('token');
    if (accessToken !== null) 
        this.getDirector(accessToken);
  
   }

    render() {
        const {onBackClick} = this.props;
        const director =this.state.director;
        console.log(this.state.director);

        return (
           <Card className = "director-view">
            <Card.Header>
            <div className = "director-name">
            <span className = "label">Name: </span>
            <span className = "value">{director.Name}</span>
            </div>
            </Card.Header>
            <Card.Body>
            <div className = "director-bio">
            <span className = "label">Bio: </span>
            <span className = "value">{director.Bio}</span>
            </div>
            <div className = "director-birth-year">
            <span className = "label">Birth Year: </span>
            <span className = "value">{director.Birth}</span>
            </div>
            <div className = "director-death-year">
            <span className = "label">Death Year: </span>
            <span className = "value">{director.Death}</span>
            </div>
            <Button variant ="danger" onClick={() => {onBackClick(null);}}>Back</Button>
            </Card.Body>
            </Card>
            
        );       
    }
}

DirectorView.propTypes = {
    director:PropTypes.shape({
        Name:PropTypes.string.isRequired,
        Bio:PropTypes.string.isRequired,
    }).isRequired
};

export default DirectorView;