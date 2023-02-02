import styles from "../styles/Footer.module.scss";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <ul className={styles.sns_links + " mx-3"}>
          <li>
            <a
              href="https://twitter.com/ayase_lab"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
          <li>
            <a
              href="https://github.com/aya-se"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kakeru-hattori-973404240/"
              target="_blank"
              rel="noreferrer"
            ></a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
