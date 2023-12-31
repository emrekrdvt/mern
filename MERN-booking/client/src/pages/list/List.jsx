import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./list.css";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { SearchItem } from "../../components/searchItem/SearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function List() {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [option, setOption] = useState(location.state.options);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99999);

  const apiUrl = process.env.REACT_APP_URL;


  const { data, loading, error, reFetch } = useFetch(
    `${apiUrl}/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="List" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="listItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="listItem" onClick={() => setOpenDate(!openDate)}>
              <label>Check-in Date </label>
              <span>
                {`${format(date[0].startDate, "dd-MM-yyyy")} to ${format(
                  date[0].endDate,
                  "dd-MM-yyyy"
                )}`}
              </span>
              {openDate && (
                <>
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                  ></DateRange>
                </>
              )}
            </div>
            <div className="listItem">
              <label>Options</label>
              <div className="listOptions">
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="listOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="listOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Adult </span>
                  <input
                    type="number"
                    className="listOptionInput"
                    placeholder={option.adult}
                    min={1}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Children </span>
                  <input
                    min={0}
                    type="number"
                    className="listOptionInput"
                    placeholder={option.children}
                  />
                </div>
                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input
                    type="number"
                    className="listOptionInput"
                    placeholder={option.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin spinReverse />
            ) : (
              <>
                {data.map((e) => (
                  <SearchItem hotel={e} key={e._id}></SearchItem>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
