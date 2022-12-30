import styles from "./Chat.module.css";
import { username } from "../../objs";
import { FaComments } from "react-icons/fa";

function Chat({ toggleChat }) {
  const style = { color: "#fff", fontSize: "0.8em", marginRight: "10px" };
  const messages = [
    {
      msg: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      msg: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ideserunt mollit anim id est laborum.",
    },
    { msg: "Hello World!" },
    {
      msg: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ideserunt mollit anim id est laborum.",
    },
    {
      msg: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ideserunt mollit anim id est laborum.",
    },
  ];

  var date = new Date();
  var current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return (
    <section>
      <div className={styles.chat}>
        <button className={styles.close_chat} onClick={() => toggleChat(false)}>
          &times;
        </button>
        <h1 className={styles.chat_header}>
          <FaComments style={style} />
          {/* Add group name dynamically */}
          {'Group Chat'}
        </h1>
        <div className={styles.chat_box}>
          {messages.map((msg) => (
            <div className={styles.message}>
              <img
                className={styles.user_image}
                src={username[0].image}
                alt="Profile img"
              />
              <div>
                <div className={styles.user_date_msg}>
                  <h4>{username[0].name}</h4>
                  <p>
                    {current_date} / {current_time}
                  </p>
                </div>
                <p>{msg.msg}</p>
              </div>
            </div>
          ))}
        </div>
        <input
          className={styles.message_box}
          placeholder="Type a new message"
          onChange={{}}
        ></input>
      </div>
      <div className={styles.overlay} onClick={() => toggleChat(false)}></div>
    </section>
  );
}

export default Chat;
