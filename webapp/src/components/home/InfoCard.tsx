import * as React from "react";
import noimage from '../../images/no_image.png';
import './InfoCard.css';

interface Props {
    username: string,
    rating: number,
    comments: string
}
  
export default function InfoCard<Props>( props:any ): JSX.Element {

    return (
        <div className="card-container">
            <div className="card-header">
                <h3>{props.username}</h3>
                <h5>Rating: {props.rating}</h5>
            </div>
            <p>{props.comments}</p>
            <img className="image-container" src={noimage}/>
        </div>
    );

}