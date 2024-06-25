import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ user, logout }) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            {user ? (
              <>
                <button className="uploadmodelbtn">
                  <Link to="/upload">Upload Model</Link>
                </button>

                <li>
                  <button className="logoutbtn" onClick={logout}>
                    Log Out
                  </button>
                </li>

                <li className="loggedin">
                  <span>Logged in as: </span>
                  <span>{user.full_name}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
