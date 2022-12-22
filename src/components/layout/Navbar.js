import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../../assets/img/logo.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const authenticated = false;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="S4S" />
        <h2>Seeking 4 Sports</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          //Empty tags as it is not allowed to have more than one child component <></>
          <>
            <li>
              <Link to="/user/newactivity">New Activity</Link>
            </li>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            <li>Exit</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
