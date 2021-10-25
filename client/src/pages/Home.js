import React from "react";
import PostOverview from "../components/PostOverview";
import MoneyJar from "../money-jar.svg";
import Polygon from "../polygon.png";

function Home() {
  return <div>
    <div className="flex-container container1">
      <img  style={{"height": '290px'}} src={MoneyJar} alt="React Logo" />
      <div style={{marginTop :'80px', 'marginLeft':"50%"}}><img  className="mr-0" style={{"height": '100px'}} src={Polygon} alt="Polygon Matic" /></div>
    </div>
    <PostOverview />
  </div>;
}

export default Home;
