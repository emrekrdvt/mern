import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function FeaturedProperties() {
  const apiUrl = process.env.REACT_APP_URL;
  const noPhoto = process.env.REACT_APP_NP;
  const { data, loading, error } = useFetch(
    `${apiUrl}/hotels?featured=true&limit=4`
  );

  return (
    <div className="fp">
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin spinReverse />
      ) : (
        <>
          {data.map((e) => (
            <div className="fpItem" key={e._id}>
              <img src={e.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{e.name}</span>
              <span className="fpCity">{e.city}</span>
              <span className="fpPrice">Starting from {e.cheapestPrice}</span>
              {e.rating && (
                <div className="fpRating">
                  <button>e.rating</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
