import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { sports } from "../../objs";
import Chat from "./Chat"

function MyActivities() {
  const [activities, setActivities] = useState([]);
  const [chatOpened, setChatOpened] = useState(false);

  useEffect(() => {
    setActivities(sports);
  }, []);

  function openChat() {
    setChatOpened(true);
  }

  function closeChat() {
    setChatOpened(false);
  }

  return (
    <section>
      {chatOpened ? (<Chat closeChat={closeChat}/>) : (<></>)}
      <div className={styles.sportslist_container}>
        {activities.length > 0 &&
          activities.map((sport) => (
            <div className={styles.sportslist_row} key={sport.id}>
              <img
                className={styles.mysport_image}
                src={sport.image}
                alt="Sport_Image"
              />
              <div className={styles.details}>
                <h3>{sport.sport}</h3>
                <p>
                  <span className="bold">Date:</span> {sport.date}
                  <span className="bold"></span> {sport.time}
                  <span className="bold"> / Location:</span> {sport.location}
                </p>
                <p>
                  <Link to={`/sport/${sport.id}`}>More details</Link>
                </p>
              </div>
              <div className={styles.actions}>
                <button className={styles.btn1} onClick={openChat}>
                  Chat
                </button>
                {sport.host === "sbritobreno" ? (
                  <button className={styles.btn2} onClick={{}}>Delete Group</button>
                ) : (
                  <button className={styles.btn2} onClick={{}}>Leave Group</button>
                )}
              </div>
            </div>
          ))}
        {activities.length === 0 && <p>There is no activities :/</p>}
      </div>
    </section>
  );
}

export default MyActivities;
