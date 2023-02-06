import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>QSS Demo</title>
      </Head>
      <div className={styles.top_content}>
        <h1 className={styles.top_title}>Query Suggestion and Summarization</h1>
        <h3 className={styles.top_description}>
          クエリ推薦付き要約は、ユーザ体験向上のための新しい文書自動要約形式です。クエリ指向要約を発展させ、複数のクエリと要約を統合的に生成します。
        </h3>
        <Link className={styles.top_button} href="/summary?d=1&m=1">
          試してみる
        </Link>
      </div>
    </div>
  );
}
