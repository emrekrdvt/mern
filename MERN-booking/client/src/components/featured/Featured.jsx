import "./featured.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Featured() {
  const apiUrl = process.env.REACT_APP_URL;

  const { data, loading, error } = useFetch(
    `${apiUrl}/hotels/countByCity?cities=Ankara,worldxd,Istanbul`
  );

  return (
    <>
      <div className="featured">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin spinReverse>
            {" "}
          </FontAwesomeIcon>
        ) : (
          <>
            <div className="featuredItem">
              <img
                src="https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png"
                alt=""
                className="featuredItemImg"
              />
              <div className="featuredTitles">
                <h1>Ankara</h1>
                <h2>{data[0]} property</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                src="https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png"
                alt=""
                className="featuredItemImg"
              />
              <div className="featuredTitles">
                <h1>Worldxd</h1>
                <h2>{data[1]} property</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                src="https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png"
                alt=""
                className="featuredItemImg"
              />
              <div className="featuredTitles">
                <h1>Istanbul</h1>
                <h2>{data[2]} property</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
