import Head from "next/head";
import Link from "next/link";
import InfoCard from "../components/InfoCard";
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
        <Link className={styles.top_button} href="/summary">
          試してみる
        </Link>
      </div>
      <div className={styles.info_content}>
        <InfoCard title={"クエリと要約の統合的な生成"} image={"/info_1.png"}>
          ある特定のトピック・内容に関するクエリ
          （質問）とそれに対する要約の組を複数提示し、可読性と情報性を両立した要約を目指します。
        </InfoCard>
        <InfoCard title={"クエリと要約の生成モデル"} image={"/info_2.png"}>
          クエリと要約の生成には、主に
          <a
            href="https://aclanthology.org/2022.findings-naacl.109/"
            target="_blank"
            rel="noreferrer"
          >
            SegEnc
          </a>
          （Segment Encoder）という、
          <a
            href="https://aclanthology.org/2021.eacl-main.74/"
            target="_blank"
            rel="noreferrer"
          >
            Fusion-in-Decoder
          </a>
          のアーキテクチャを取り入れた先行研究のモデルを利用します。
        </InfoCard>
        <InfoCard
          title={"文書の特定の区間に着目した生成"}
          image={"/info_3.png"}
        >
          ある1つの文書から多様な内容のクエリを提示するための工夫として、文書全体を均等に分割して入力し、クエリを個別に生成する手法を提案します。
        </InfoCard>
        <InfoCard title={"ターン・フィルタ"} image={"/info_4.png"}>
          文書のより重要な内容をカバーするクエリと要約を生成するのための工夫として、文書の重要でない部分を事前に予測して除去する仕組みを導入します。
        </InfoCard>
        <InfoCard title={"使用するデータセット"} image={"/info_5.png"}>
          本研究では、マルチドメインの議事録を対象にした、クエリ指向要約向けの英語データセットである
          <a
            href="https://aclanthology.org/2021.naacl-main.472/"
            target="_blank"
            rel="noreferrer"
          >
            QMSum
          </a>
          を使用しています。
        </InfoCard>
        <InfoCard title={"論文情報"} image={"/info_6.png"}>
          本研究は、2023年3月に開催される言語処理学会第29回年次大会に投稿・発表します。投稿した論文は
          <a
            href="https://www.anlp.jp/proceedings/annual_meeting/2023/pdf_dir/H5-2.pdf"
            target="_blank"
            rel="noreferrer"
          >
            こちら
          </a>
          からご覧いただけます。
        </InfoCard>
      </div>
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
              href="https://github.com/aya-se/qss-demo"
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
    </div>
  );
}
