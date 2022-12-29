import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { sports } from "../../objs";

function Home() {
  const [activities, setActivities] = useState([]);
  const [searchfield, setSearchfield] = useState("");
  const filteredSports = activities.filter((sport) => {
    return sport.sport.toLowerCase().includes(searchfield.toLowerCase());
  });

  useEffect(() => {
    setActivities(sports);
  }, []);

  function onSearchChange(event) {
    setSearchfield(event.target.value);
  }

  return (
    <section>
      <div className={styles.sport_home_header}>
        <h1>Join today a group a players and start playing what you love!</h1>
        <p>See details of each activity and their members.</p>
      </div>
      <div className={styles.search_box}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search Sports"
          onChange={onSearchChange}
        />
      </div>
      <div className={styles.sport_container}>
        {activities.length > 0 &&
          filteredSports.map((sport) => (
            <div className={styles.sport_card} key={sport.id}>
              <div
                style={{
                  backgroundImage: `url(${sport.image})`,
                }}
                className={styles.sport_card_image}
              ></div>
              <h3>{sport.sport}</h3>
              <p>
                <span className="bold">Date:</span> {sport.date}
              </p>
              <p>
                <span className="bold">Location:</span> {sport.location}
              </p>
              <p>
                <span className="bold">Missing:</span>{" "}
                {sport.total_players - sport.members.length} players
              </p>
              {sport.total_players - sport.members.length > 0 ? (
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
