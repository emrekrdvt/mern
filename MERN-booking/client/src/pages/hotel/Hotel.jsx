import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";
import "./hotel.css";

export default function Hotel() {
  const photos = [
    {
      src: "https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png",
    },
    {
      src: "https://v4m9y9w9.rocketcdn.me/wp-content/uploads/2019/03/rivendell-bookstr.jpg",
    },
    {
      src: "https://www.doc.govt.nz/globalassets/images/places/lord-of-the-rings-locations/putangirua-pinnacles-1200.jpg",
    },
    {
      src: "https://i.insider.com/56094329dd0895057e8b45de?width=1200&format=jpeg",
    },
    {
      src: "https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png",
    },
    {
      src: "https://tolkiengateway.net/w/images/thumb/9/93/Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png/1200px-Ralph_Damiani_-_Across_Middle-earth_-_The_White_City.png",
    },
  ];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction == "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Header type={"List"}></Header>
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
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
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
          <h1 className="hotelTitle">Minas Tirith</h1>
          <div className="hotelAdress">
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            <span>Away from the darkness </span>
          </div>
          <span className="hotelDistance">
            Excellent location from war center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay ver $143 blablabla.
          </span>
          <div className="hotelImages">
            {photos.map((e, i) => (
              <div className="hotelImgWrapper">
                <img
                  onClick={() => handleOpen(i)}
                  src={e.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heat of Minas Tirith</h1>
              <p className="hotelDesc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis, repellendus veniam, officiis quos facere dicta nam
                temporibus doloremque cumque ratione aspernatur unde molestiae
                ipsum, corporis non minima rem consequatur assumenda. Ipsum
                vitae eum magni, rem ducimus voluptatem voluptates atque, odit
                explicabo dolorem inventore incidunt nisi vel recusandae sint
                consectetur nihil dignissimos! Rerum non eos laboriosam facilis
                ad est inventore corrupti! Porro excepturi fugit, laudantium,
                ipsam nostrum iure repellat omnis at soluta placeat in? Sit
                officia iusto unde. Porro voluptatem rerum eligendi ullam quos
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9 night stay</h1>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                illum soluta consectetur consequuntur natus sequi asperiores{" "}
              </span>
              <h2>
                <b>$123</b> (9 night)
              </h2>
              <button>Reserve or Book now</button>
            </div>
          </div>
        </div>
        <MailList></MailList>
        <Footer></Footer>
      </div>
    </div>
  );
}
