import styles from "./ActivityDetails.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { sports } from "../../objs";

function ActivityDetails() {
  const [activity, setActivity] = useState({});

  useEffect(() => {
    setActivity(sports[1]);
  }, []);

  return (
    <>
      {activity.sport && (
        <section className={styles.activity_details_container}>
          <div className={styles.activity_details_header}>
            <h1>Details about this activity :)</h1>
          </div>
          <div className={styles.activity_images}>
            <img src={activity.image} alt={activity.sport} />
          </div>
          <h3>{activity.sport}</h3>
          <p>
            <span className="bold">Date:</span> {activity.date}
          </p>
          <p>
            <span className="bold">Location:</span> {activity.location}
          </p>
          <p>
            <span className="bold">Missing:</span>{" "}
            {activity.total_players - activity.members.length} players
          </p>
        </section>
      )}
    </>
  );
}

export default ActivityDetails;
