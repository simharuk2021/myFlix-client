import React from 'react';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import Card from'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
export class ProfileView extends React.Component{

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
        const {user, username, email, password, birthday, favoritemovies, onBackClick} = this.props;

        return (
           <Card className = "profile-view">
            <Card.Header>
            <div className = "profile-name">
            <span className = "label">Username: </span>
            <span className = "value">{user.Name}</span>
            </div>
            </Card.Header>
            <Card.Body>
            <div className = "Email">
            <span className = "label">Password: </span>
            <span className = "value">{user.Password}</span>
            </div>
            <div className = "Email">
            <span className = "label">Email: </span>
            <span className = "value">{user.Email}</span>
            </div>
            <div className = "Email">
            <span className = "label">Birthday: </span>
            <span className = "value">{user.Birthday}</span>
            </div>
            
            <Button variant ="danger" onClick={() => {onBackClick(null);}}>Back</Button>
            </Card.Body>
            </Card>
        );       
    }
}

ProfileView.propTypes = {
    profile: PropTypes.shape({
        Username:PropTypes.string.isRequired,
        Password:PropTypes.string.isRequired,
        Email:PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }).isRequired
};

export default ProfileView;