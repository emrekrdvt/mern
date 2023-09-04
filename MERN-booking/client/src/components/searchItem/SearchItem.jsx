import "./searchItem.css";

export const SearchItem = () => {
  return (
    <>
      <div className="searchItem">
        <img
          src="https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">Tower Street Apart</h1>
          <span className="siDistance">500m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">Studio Apart with Air conditioning</span>
          <span className="siFeatures">Entire studio - 1 Bathroom</span>
          <span className="siCancelOp">Free Cancellation</span>
          <span className="siCancelOpSubtitle">You can cancel later, so luck in this great price today!</span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$123</span>
            <span className="siTax">Includes taxes and fees</span>
            <button className="siCheckButton">See the avilabilty</button>
          </div>
        </div>
      </div>
    </>
  );
};
