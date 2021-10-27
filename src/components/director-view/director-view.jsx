import React from 'react';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import Card from'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export function DirectorView (props)
{
   const { director} = props;
   console.log(director)   

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
            <Link to={"/"}> 
            <Button variant ="danger">Back</Button> 
            </Link>
            </Card.Body>
            </Card>
            
        )}
           