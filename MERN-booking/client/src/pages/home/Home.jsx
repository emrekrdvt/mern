import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import { Footer } from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { MailList } from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import ProperyList from "../../components/properyList/ProperyList";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <ProperyList></ProperyList>
        <h1 className="homeTitle">Home guests love</h1>
        <FeaturedProperties></FeaturedProperties>
        <MailList></MailList>
        <Footer></Footer>
      </div>
    </div>
  );
}
