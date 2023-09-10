import "./properyList.css";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ProperyList() {
  const apiUrl = process.env.REACT_APP_URL;

  const { data, loading, error } = useFetch(`${apiUrl}/hotels/countByType`);

  const images = [
    "https://images3.alphacoders.com/713/713120.png",
    "https://images3.alphacoders.com/713/713120.png",
    "https://images3.alphacoders.com/713/713120.png",
    "https://images3.alphacoders.com/713/713120.png",
    "https://images3.alphacoders.com/713/713120.png",
  ];

  return (
    <>
      <div className="pList">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin spinReverse>
            {" "}
          </FontAwesomeIcon>
        ) : (
          <>
            {data &&
              images.map((img, i) => (
                <div className="pListItem" key={i}>
                  <img src={img} alt="" className="pListImg" />

                  <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} Hotels</h2>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}
