import {useState, useEffect} from "react";
import noimage from '../../images/no_image.png';
import { UrlObject, } from "url";
import './InfoCard.css';

interface Props {
    username: string,
    rating: number,
    comments: string,
    image: File
}
  
export default function InfoCard<Props>( props:any ): JSX.Element {

    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        if (props.image != undefined) {
          setImageUrl(URL.createObjectURL(props.image));
        }
      }, [props.image]);

    return (
        <div className="card-container">
            <div className="card-header">
                <h3>{props.username}</h3>
                <h5>Rating: {props.rating}</h5>
            </div>
            <div className="text-container">
                {props.comments}
            </div>
            <div className="image-container">
                <img src={props.image != undefined ? imageUrl : noimage}/>
            </div>
        </div>
    );

}