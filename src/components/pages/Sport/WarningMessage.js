import styles from "./WarningMessage.module.css";

function WarningMessage({ toggleWarningMessage, btnText, warningMessage }) {
  return (
    <section>
      <div className={styles.warning}>
        <button
          className={styles.close_warning}
          onClick={() => toggleWarningMessage(false)}
        >
          &times;
        </button>
        <h1 className={styles.warning_header}>Warning</h1>
        <div className={styles.message}>
          <p className={styles.message_p}>{warningMessage}</p>
        </div>
        <div className={styles.btns}>
          <button
            className={styles.btn1}
            onClick={() => toggleWarningMessage(false)}
          >
            Cancel
          </button>
          <button className={styles.btn2}>{btnText}</button>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={() => toggleWarningMessage(false)}
      ></div>
    </section>
  );
}

export default WarningMessage;
