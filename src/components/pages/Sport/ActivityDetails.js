import api from "../../../utils/api";
import styles from "./ActivityDetails.module.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import WarningMessage from "../Warning/WarningMessage";

function ActivityDetails() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const [activity, setActivity] = useState({});
  const [warningOpen, setWarningOpen] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);
  const [isAMember, setIsAMember] = useState(false);
  const [btnText, setBtnText] = useState("");
  const { id } = useParams();
  const warningMessage = `Are you sure you want to ${btnText.toLowerCase()} ?`;

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

    api.get(`/sport/${id}`).then((response) => {
      setActivity(response.data.activity);
    });

  }, [id, token]);
  
  async function isMember(){
    //create api to check if user is a member and setState
  }

  async function joinGroup(){
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
            <img
              src={`${process.env.REACT_APP_API}/images/sports/${activity.image}`}
              alt={activity.sport}
            />
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
              {isMember() ? (
                <>
                  <button
                    className={styles.btn1}
                    onClick={() => toggleChat(true)}
                  >
                    Chat
                  </button>
                  {activity.UserId === user.id ? (
                    <button
                      className={styles.btn2}
                      onClick={() => {
                        toggleWarningMessage(true);
                        setBtnText("Delete Activity");
                      }}
                    >
                      Delete Group
                    </button>
                  ) : (
                    <button
                      className={styles.btn2}
                      onClick={() => {
                        toggleWarningMessage(true);
                        setBtnText("Leave Activity");
                      }}
                    >
                      Leave Group
                    </button>
                  )}
                </>
              ) : (
                <button className={styles.btn1} onClick={() => {joinGroup()}}>
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
