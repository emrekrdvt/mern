import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import "./hotel.css";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Reserve } from "../../components/reserve/Reserve";

export default function Hotel() {
  const [slideNumber, setSlideNumber] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation().pathname.split("/")[2];
  const apiUrl = process.env.REACT_APP_URL;
  const noPhoto = [process.env.REACT_APP_NP];
  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const { data, loading, error } = useFetch(
    `${apiUrl}/hotels/find/${location}`
  );

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction == "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;

    setSlideNumber(newSlideNumber);
  };

  const dayDiff = (date) => {
    if (date.length > 0) {
      var start = date[0].startDate;
      var end = date[0].endDate;
      const ml = 1000 * 3600 * 24;
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const convertDay = Math.ceil(timeDiff / ml);
      return convertDay;
    }
    else
      navigate("/")
  };

  const days = dayDiff(date);

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <Header type={"List"}></Header>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin spinReverse />
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                onClick={() => setOpen(false)}
                className="close"
                icon={faCircleXmark}
              />
              <FontAwesomeIcon
                className="arrow"
                icon={faCircleArrowLeft}
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                className="arrow"
                icon={faCircleArrowRight}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAdress">
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
              <span>{data.city} </span>
            </div>
            <span className="hotelDistance">
              {data.distance} m away from the
            </span>
            <span className="hotelPriceHighlight">
              Starting from ${data.cheapestPrice}
            </span>
            <div className="hotelImages">
              {data.photos?.map((e, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={e}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay</h1>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis illum soluta consectetur consequuntur natus sequi
                  asperiores{" "}
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> for {days}{" "}
                  night
                </h2>
                <button onClick={handleClick}>Reserve or Book now</button>
              </div>
            </div>
          </div>
          <MailList></MailList>
          <Footer></Footer>
        </div>
      )}
      {openModal && (
        <Reserve setOpen={setOpenModal} hotelId={data._id}></Reserve>
      )}
    </div>
  );
}
