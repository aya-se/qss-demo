import Head from "next/head";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { useEffect, useState } from "react";
import styles from "../styles/Summary.module.scss";
import { GetServerSideProps } from "next";

export const getServerSideProps = async (props: GetServerSideProps) => {
  console.log(props.req);
  const filePath = path.join(
    process.cwd(),
    `public/data/query+summary/basic_0_1.json`
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
    <div>
      <Head>
        <title>Summary | QSS Demo</title>
      </Head>
      {props.outputs.map((value, idx) => (
        <div key={idx}>
          <div>{value.query}</div>
          <div>{value.summary}</div>
        </div>
      ))}
    </div>
  );
}
