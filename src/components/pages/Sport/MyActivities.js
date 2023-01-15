import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Chat from "./Chat";
import WarningMessage from "../Warning/WarningMessage";
import { useNavigate } from "react-router-dom";

function MyActivities() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token"));
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState(0);
  const [chatOpened, setChatOpened] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [btnText, setBtnText] = useState("");
  const navigate = useNavigate();
  const warningMessage = `Are you sure you want to ${btnText.toLowerCase()} this activity ?`;

  useEffect(() => {
    api
      .get("/user/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });

    api
      .get("/sport/myactivities", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setActivities(response.data.sports);
      });
  }, [token]);

  function toggleChat(value, sportId) {
    setActivityId(sportId);
    setChatOpened(value);
  }

  function toggleWarningMessage(value, sportId) {
    setActivityId(sportId);
    setWarningOpen(value);
  }

  return (
    <section>
      {chatOpened ? (
        <Chat sportId={activityId} toggleChat={toggleChat} />
      ) : (
        <></>
      )}
      {warningOpen ? (
        <WarningMessage
          toggleWarningMessage={toggleWarningMessage}
          btnText={btnText}
          warningMessage={warningMessage}
          sportId={activityId}
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
                src={`${process.env.REACT_APP_API}/images/sports/${sport.image}`}
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
                  onClick={() => toggleChat(true, sport.id)}
                >
                  Chat
                </button>
                {sport.UserId === user.id ? (
                  <button
                    className={styles.btn2}
                    onClick={() => {
                      toggleWarningMessage(true, sport.id);
                      setBtnText("Delete Activity");
                    }}
                  >
                    Delete Group
                  </button>
                ) : (
                  <button
                    className={styles.btn2}
                    onClick={() => {
                      toggleWarningMessage(true, sport.id);
                      setBtnText("Leave Activity");
                    }}
                  >
                    Leave Group
                  </button>
                )}
                <button
                  className={styles.btn3}
                  disabled={sport.UserId !== user.id}
                  onClick={() => navigate(`/sport/editactivity/${sport.id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        {activities.length === 0 && (
          <p>You are not a member of any activity yet :/</p>
        )}
      </div>
    </section>
  );
}

export default MyActivities;
