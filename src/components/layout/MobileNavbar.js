import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import Logo from "../../assets/img/S4S_logo.png";
import styles from "./MobileNavbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

/* Contenxt */
import { Context } from "../../context/UserContext";

function MobileNavbar() {
  const { authenticated, logout } = useContext(Context);
  const [dropdownOpen, setMobileDropdownOpen] = useState(false);
  const style = { color: "#fff", fontSize: "2em", marginRight: "10px" };

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <img src={Logo} alt="S4S" />
          <h2>Seeking 4 Sports</h2>
        </div>
          <div className={styles.dropdown}>
            <Link onClick={() => setMobileDropdownOpen(!dropdownOpen)}>
              <GiHamburgerMenu style={style} />
            </Link>
            {dropdownOpen && (
              <div className={styles.dropdown_content}>
                <Link to="/">Home</Link>
                {authenticated ? (
                  //Empty tags as it is not allowed to have more than one child component <></>
                  <>
                    <Link to="/sport/newactivity">New Activity</Link>
                    <Link to="/sport/myactivities">My Activities</Link>
                    <Link to="/user/profile">Profile</Link>
                    <Link to="/" onClick={logout}>Logout</Link>
                  </>
                ) : (
                  <>
                      <Link to="/login">Log in</Link>
                      <Link to="/register">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
      </div>
    </nav>
  );
}

export default MobileNavbar;
