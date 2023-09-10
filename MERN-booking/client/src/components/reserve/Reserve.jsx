import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

export const Reserve = ({ setOpen, hotelId }) => {
  const apiUrl = process.env.REACT_APP_URL;
  const noPhoto = [process.env.REACT_APP_NP];
  const { data, loading, error } = useFetch(`${apiUrl}/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { date } = useContext(SearchContext);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];
    while (date < end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavaliableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleReserve = async () => {
    try {
        await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${apiUrl}/rooms/avlb/${roomId}`, {
            dates: allDates,
          });
          return res.data
        }));
        setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms : </span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>
            <div className="rSelectedRooms">
              {item.roomNumbers.map((rN) => (
                <div className="room" key={rN._id}>
                  <label>{rN.number}</label>
                  <input
                    disabled={!isAvailable(rN)}
                    type="checkBox"
                    value={rN._id}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleReserve}>
          Reserve Now !
        </button>
      </div>
    </div>
  );
};
