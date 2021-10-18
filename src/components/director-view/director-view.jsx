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

    render() {
        const {director, movie, onBackClick} = this.props;

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
        Birth:PropTypes.string.isRequired,
        Death:PropTypes.string.isRequired,
    }).isRequired
};

export default DirectorView;