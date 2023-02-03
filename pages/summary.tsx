import Head from "next/head";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { useEffect, useState } from "react";
import styles from "../styles/Summary.module.scss";
import { GetServerSidePropsContext } from "next";
import Accordion from "../components/Accordion";
import SwitchButton from "../components/SwitchButton";

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const outputs_path = path.join(
    process.cwd(),
    `public/data/query+summary/basic_0_${query.m}.json`
  );
  const documents_path = path.join(process.cwd(), `public/data/documents.json`);

  const data_outputs: any = await fsPromises.readFile(outputs_path);
  const data_documents: any = await fsPromises.readFile(documents_path);
  const outputs = JSON.parse(data_outputs);
  const documents = JSON.parse(data_documents);

  return {
    props: { outputs, documents },
  };
};

type PageProps = {
  outputs: Array<any>;
  documents: Array<any>;
};

export default function Summary(props: PageProps) {
  const router = useRouter();
  const query = router.query;
  const [content, setContent] = useState<string>("summary");
  const [documentId, setDocumentId] = useState<number>(0);
  const [modelType, setModelType] = useState<string>("query+summary");
  const [modelId, setModelId] = useState<number>(0);
  const [isDocument, setIsDocument] = useState<boolean>(false);
  return (
    <main>
      <Head>
        <title>Summary | QSS Demo</title>
      </Head>
      <div className={styles.top_content}>
        <SwitchButton value={isDocument} setValue={setIsDocument} />
        <div className={styles.top_text}>{!isDocument ? "要約" : "文書"}</div>
      </div>
      {!isDocument &&
        props.outputs.map((value, idx) => (
          <div key={idx} id={`output-${idx}`} className={styles.output_content}>
            <Accordion query={value.query} summary={value.summary} idx={idx} />
          </div>
        ))}
      {isDocument &&
        props.documents[Number(query.d)].meeting_transcripts.map(
          (value: string, idx: number) => (
            <div key={idx} id={`turn-${idx}`}>
              <div className={styles.turn_content}>
                <div className={styles.turn_speaker}>
                  <span>{value.substring(0, value.indexOf(":") + 1)}</span>
                </div>
                <span className={styles.turn_text}>
                  {value.substring(value.indexOf(":") + 1, value.length)}
                </span>
              </div>
            </div>
          )
        )}
    </main>
  );
}
