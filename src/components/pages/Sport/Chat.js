import styles from "./Chat.module.css";
import api from "../../../utils/api";
import { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";

function Chat({ toggleChat, sportId }) {
  const [messages, setMessages] = useState([]);
  const [activity, setActivity] = useState({});
  const [new_message, setNewMessage] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const [members, setMembers] = useState([]);
  const style = { color: "#fff", fontSize: "0.8em", marginRight: "10px" };

  // Scrolls to the end of the chat
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  
  useEffect(() => {
    api.get(`/sport/${sportId}`).then((response) => {
      setActivity(response.data.activity);
    });

    api.get(`/message/sport/${sportId}`).then((response) => {
      setMessages(response.data.data);
    });

    api.get(`/sport/${sportId}/members`).then((response) => {
      setMembers(response.data.members);
    });

    scrollToBottom()
    
  }, [sportId, token, members]);
  
  function handleChange(e) {
    setNewMessage({ ...new_message, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .post(`/message/new/sport/${sportId}`, new_message)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });

    setNewMessage("");
    e.target.reset();
  }

  return (
    <section>
      <div className={styles.chat}>
        <button className={styles.close_chat} onClick={() => toggleChat(false)}>
          &times;
        </button>
        <h1 className={styles.chat_header}>
          <FaComments style={style} />
          {activity.group_name}
        </h1>
        <div className={styles.chat_box}>
          {messages.map((msg) => (
            <div className={styles.message}>
              {members
                .filter((member) => member.id === msg.UserId)
                .map((member) => (
                  <img
                    className={styles.user_image}
                    src={`${process.env.REACT_APP_API}/images/users/${member.image}`}
                    alt="Profile img"
                  />
                ))}
              <div>
                <div className={styles.user_date_msg}>
                  {members
                    .filter((member) => member.id === msg.UserId)
                    .map((member) => (
                      <h4>{member.username}</h4>
                    ))}
                  <p>{msg.createdAt.replace('T',' / ').replace('.000Z','')}</p>
                </div>
                <p>{msg.message}</p>
              </div>
              <div ref={messagesEndRef} />
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.message_box}
            type="text"
            name="message_text"
            placeholder="Type a new message"
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </form>
      </div>
      <div className={styles.overlay} onClick={() => toggleChat(false)}></div>
    </section>
  );
}

export default Chat;
