import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../../assets/img/S4S_logo.png";
import styles from "./Navbar.module.css";

/* Contenxt */
import {Context} from '../../context/UserContext'

function Navbar() {
  const {authenticated, logout} = useContext(Context)

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
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
              <Link to="/user/myactivities">My Activities</Link>
            </li>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            <li onClick={logout}>Log out</li>
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
      </div>
    </nav>
  );
}

export default Navbar;
