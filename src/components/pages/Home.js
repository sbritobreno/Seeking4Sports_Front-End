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
      <div className={styles.pet_home_header}>
        <h1>Seeking 4 Sports</h1>
        <p>See details of each activity and their hosts</p>
      </div>
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
                <span className="bold">Members:</span> {sport.players}
              </p>
              <p>
                <span className="bold">Total:</span> {sport.total}
              </p>
            </div>
          ))}
        {activities.length === 0 && <p>There is no activities :/</p>}
      </div>
    </section>
  );
}

export default Home;
