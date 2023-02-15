import styles from "../styles/Footer.module.scss";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <span>Copyright &copy; KAKERU HATTORI. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
