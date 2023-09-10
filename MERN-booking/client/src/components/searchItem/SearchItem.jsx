import { Link } from "react-router-dom";
import "./searchItem.css";

export const SearchItem = ({hotel}) => {
  const noPhoto = process.env.REACT_APP_NP;
  
  return (
    <>
      <div className="searchItem">
        <img src={hotel.photos[0] !== undefined ? hotel.photos[0] : noPhoto} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">{hotel.name}</h1>
          <span className="siDistance">{hotel.distance}m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">Studio Apart with Air conditioning</span>
          <span className="siFeatures">{hotel.desc}</span>
          <span className="siCancelOp">Free Cancellation</span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so luck in this great price today!
          </span>
        </div>
        <div className="siDetails">
          {hotel.rating && (
            <div className="siRating">
            
              <span>Excellent</span>
              <button>{item.rating}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">${hotel.cheapestPrice}</span>
            <span className="siTax">Includes taxes and fees</span>
            <Link to={`/hotels/${hotel._id}`}>
            <button className="siCheckButton">See the avilabilty</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
