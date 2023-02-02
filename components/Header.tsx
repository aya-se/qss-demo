import Link from "next/link";
import styles from "../styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_contents}>
        <Link href="/" className={styles.header_title}>
          QSS Demo
        </Link>
      </div>
    </header>
  );
}
