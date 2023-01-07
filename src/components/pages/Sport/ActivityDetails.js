import api from "../../../utils/api";
import styles from "./ActivityDetails.module.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import {useParams} from 'react-router-dom'
import WarningMessage from "../Warning/WarningMessage";

function ActivityDetails() {
  const [activity, setActivity] = useState({});
  const [chatOpened, setChatOpened] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [btnText, setBtnText] = useState("");
  const {id} = useParams()
  const warningMessage = `Are you sure you want to ${btnText.toLowerCase()} this activity ?`;

  useEffect(() => {
    api.get(`/sport/${id}`).then((response) => {
      setActivity(response.data.activity);
  })
  }, [id]);

  function isAMember() {
    return true;
  }

  function toggleChat(value) {
    setChatOpened(value);
  }

  function toggleWarningMessage(value) {
    setWarningOpen(value);
  }

  return (
    <>
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
      {activity.sport && (
        <section className={styles.activity_details_container}>
          <div className={styles.activity_details_header}>
            <h1 className={styles.activity_details_h1}>
              Details about {activity.group_name} :)
            </h1>
          </div>
          <div className={styles.activity_images}>
            <img src={activity.image} alt={activity.sport} />
          </div>
          <h3>{activity.sport}</h3>
          <div className={styles.activity_details_subcontainer}>
            <div className={styles.detail_block}>
              <span className="bold">Description:</span>
              <p>{activity.description}</p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Admin:</span>
              <p>{activity.UserId}</p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Group:</span>
              <p>{activity.group_name}</p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Date:</span>
              <p>
                {activity.date} at {activity.time}
              </p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Location:</span>
              <p>{activity.location}</p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Members Joined:</span>
              <p>
                {/* {activity.members.map((member) => {
                  return member.user + "; ";
                })} */}
              </p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Total Members:</span>
              <p>{activity.total_players} players needed</p>
            </div>
            <div className={styles.detail_block}>
              <span className="bold">Missing:</span>
              <p>{activity.missing_players} players</p>
            </div>
            <div className={styles.btns}>
              {isAMember() ? (
                <>
                  <button
                    className={styles.btn1}
                    onClick={() => toggleChat(true)}
                  >
                    Chat
                  </button>
                  {activity.host === "sbritobreno" ? (
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
                </>
              ) : (
                <button className={styles.btn1} onClick={{}}>
                  Join Group
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ActivityDetails;
