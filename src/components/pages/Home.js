import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { sports } from "../objs";

function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(sports);
  }, []);

  return (
    <section>
      <div className={styles.sport_container}>
        {activities.length > 0 &&
          activities.map((sport) => (
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
                <p className={styles.adopted_text}>Currently full</p>
              )}
            </div>
          ))}
        {activities.length === 0 && <p>There is no activities :/</p>}
      </div>
    </section>
  );
}

export default Home;
