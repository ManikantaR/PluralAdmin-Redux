import React from "react";
import { Link } from "react-router";

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>My Couse Admin</h1>
        <p>React, Redux Router in ES6 for Ultra Responsive web apps</p>
        <Link to="about" className="btn brn-primary btn-lg">
          Learn More
        </Link>
      </div>
    );
  }
}

export default HomePage;
