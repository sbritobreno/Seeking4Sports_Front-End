import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  const [activities, setActivities] = useState([]);
  const [searchfieldSport, setSearchfieldSport] = useState("");
  const [searchfieldLocation, setSearchfieldLocation] = useState("");
  const [searchfieldDay, setSearchfieldDay] = useState("");
  const filteredSports = searchFilter();

  function searchFilter() {
    // filter by sport
    let result = activities.filter((activity) => {
      return activity.sport
        .toLowerCase()
        .startsWith(searchfieldSport.toLowerCase());
    });

    // filter by City/Town
    result = result.filter((activity) => {
      return activity.location
        .toLowerCase()
        .startsWith(searchfieldLocation.toLowerCase());
    });

    // filter by Day
    result = result.filter((activity) => {
      return activity.date.toLowerCase().startsWith(searchfieldDay.toLowerCase());
    });

    return result;
  }

  useEffect(() => {
    api.get("/sport").then((response) => {
      setActivities(response.data.sports);
    });
  }, []);

  function onSearchChangeSport(event) {
    setSearchfieldSport(event.target.value);
  }
  function onSearchChangeLocation(event) {
    setSearchfieldLocation(event.target.value);
  }
  function onSearchChangeDay(event) {
    setSearchfieldDay(event.target.value);
  }

  return (
    <section>
      <div className={styles.sport_home_header}>
        <h1>Join a group of players and start playing what you love!</h1>
        <p>See details of each activity and their members.</p>
      </div>
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Sport"
          onChange={onSearchChangeSport}
        />
        <input
          className={styles.search}
          type="search"
          placeholder="Search by City/Town"
          onChange={onSearchChangeLocation}
        />
        <input
          className={styles.search}
          type="search"
          placeholder="Search by Day"
          onChange={onSearchChangeDay}
        />
      </div>
      <div className={styles.sport_container}>
        {activities.length > 0 &&
          filteredSports.map((sport) => (
            <div className={styles.sport_card} key={sport.id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/sports/${sport.image})`,
                }}
                className={styles.sport_card_image}
              ></div>
              <h3>{sport.sport}</h3>
              <p>
                <span className="bold">Group name: </span> {sport.group_name}
              </p>
              <p>
                <span className="bold">Date: </span> {sport.date} {sport.time}
              </p>
              <p>
                <span className="bold">Location: </span> {sport.location}
              </p>
              <p>
                <span className="bold">Missing: </span>
                {sport.missing_players} players
              </p>
              {sport.missing_players > 0 ? (
                <Link to={`sport/${sport.id}`}>Details</Link>
              ) : (
                <p className={styles.group_full_text}>Currently full</p>
              )}
            </div>
          ))}
        {filteredSports.length === 0 && <p>No activities found :/</p>}
      </div>
    </section>
  );
}

export default Home;
