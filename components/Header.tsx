import Link from "next/link";
import styles from "../styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_contents}>
        <Link href="/">
          <a className={styles.header_title}>100knock Translation</a>
        </Link>
      </div>
    </header>
  );
}
