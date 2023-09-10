import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCar,
  faHotel,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ type }) {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: `selection`,
    },
  ]);

  const [openOptions, setOptions] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, op) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: op === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "List" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListIcon active">
            <FontAwesomeIcon icon={faHotel} />
            <span>Stays</span>
          </div>
          <div className="headerListIcon ">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListIcon ">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals </span>
          </div>
          <div className="headerListIcon ">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi</span>
          </div>
        </div>
        {type !== "List" && (
          <>
            <h1 className="headerTitle">Find ur adventure!</h1>
            <p className="headerDesc">Let's travel with FCF</p>
            {user ? (
              `Hello ${user.username}`
            ) : (
              <button className="headerBtn">Sign in / Register</button>
            )}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHotel} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                ></input>
              </div>
              <div
                className="headerSearchItem"
                onClick={() => setOpenDate(!openDate)}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span className="headerSearchText">
                  {`${format(date[0].startDate, "dd-MM-yyyy")} to ${format(
                    date[0].endDate,
                    "dd-MM-yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>

                {openOptions && (
                  <div className="option">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
