import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span className={styles.bold}>Seeking 4 Sports</span> &copy; 2023
      </p>
    </footer>
  );
}

export default Footer;
