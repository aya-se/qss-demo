import Head from "next/head";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { useEffect, useState } from "react";
import styles from "../styles/Summary.module.scss";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const filePath = path.join(
    process.cwd(),
    `public/data/query+summary/basic_0_${query.m}.json`
  );

  const data = await fsPromises.readFile(filePath);
  const outputs = JSON.parse(data);

  return {
    props: { outputs },
  };
};

type PageProps = {
  outputs: Array<any>;
};

export default function Summary(props: PageProps) {
  const router = useRouter();
  const query = router.query;
  const document_id = useState<number>(0);
  const model_type = useState<string>("query+summary");
  const model_id = useState<number>(0);
  useEffect(() => {}, []);
  return (
    <main>
      <Head>
        <title>Summary | QSS Demo</title>
      </Head>
      {props.outputs.map((value, idx) => (
        <div key={idx} id={`output-${idx}`}>
          <div className={styles.query_content}>
            <div className={styles.query_icon}>
              <span>Q</span>
            </div>
            <span className={styles.query_text}>{value.query}</span>
          </div>
          <div className={styles.answer_content}>
            <div className={styles.answer_icon}>
              <span>A</span>
            </div>
            <span className={styles.answer_text}>{value.summary}</span>
          </div>
        </div>
      ))}
    </main>
  );
}
