import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { sports } from "../../objs";
import Chat from "./Chat";
import WarningMessage from "./WarningMessage";

function MyActivities() {
  const [activities, setActivities] = useState([]);
  const [chatOpened, setChatOpened] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [btnText, setBtnText] = useState("");
  const warningMessage = `Are you sure you want to ${btnText.toLowerCase()} this activity ?`;

  useEffect(() => {
    setActivities(sports);
  }, []);

  function toggleChat(value) {
    setChatOpened(value);
  }

  function toggleWarningMessage(value) {
    setWarningOpen(value);
  }

  return (
    <section>
      {chatOpened ? <Chat toggleChat={toggleChat} /> : <></>}
      {warningOpen ? (
        <WarningMessage
          toggleWarningMessage={toggleWarningMessage}
          btnText={btnText}
          warningMessage={warningMessage}
        />
      ) : (
        <></>
      )}
      <div className={styles.home_header}>
        <h1>My Activities</h1>
        <p>It includes groups where you are either an admin or a member.</p>
      </div>
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
                  <span className="bold">Group:</span> {sport.group_name}
                </p>
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
                <button
                  className={styles.btn1}
                  onClick={() => toggleChat(true)}
                >
                  Chat
                </button>
                {sport.host === "sbritobreno" ? (
                  <button
                    className={styles.btn2}
                    onClick={() => {
                      toggleWarningMessage(true);
                      setBtnText("Delete");
                    }}
                  >
                    Delete Group
                  </button>
                ) : (
                  <button
                    className={styles.btn2}
                    onClick={() => {
                      toggleWarningMessage(true);
                      setBtnText("Leave");
                    }}
                  >
                    Leave Group
                  </button>
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
