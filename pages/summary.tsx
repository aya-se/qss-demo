import Head from "next/head";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { ChangeEvent, useEffect, useState } from "react";
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
  const [documentId, setDocumentId] = useState<number>(0);
  const [modelType, setModelType] = useState<string>("query+summary");
  const [modelId, setModelId] = useState<number>(1);
  const [isDocument, setIsDocument] = useState<boolean>(false);
  const [relevantTurns, setRelevantTurns] = useState<Array<number>>([]);
  const queryRange = [0, 12, 18, 22, 28, 32];

  const handleDocumentForm = (e: ChangeEvent<HTMLInputElement>) => {
    setDocumentId(Number(e.target.value));
    router.push(`/summary?d=${e.target.value}&m=${modelId}`);
  };
  const handleModelForm = (e: ChangeEvent<HTMLInputElement>) => {
    setModelId(Number(e.target.value));
    router.push(`/summary?d=${documentId}&m=${e.target.value}`);
  };
  const handleHighlights = (relevantSpan: Array<number>) => {
    setRelevantTurns(relevantSpan);
    setIsDocument(true);
    if (relevantSpan.length > 0) {
      router.push(
        `/summary?d=${documentId}&m=${modelId}#turn-${relevantSpan[0]}`
      );
    }
  };

  useEffect(() => {
    setDocumentId(Number(query.d));
    setModelId(Number(query.m));
  }, [query]);

  const highlightClass = (idx: number) => {
    if (relevantTurns === undefined) {
      return "";
    }
    return relevantTurns.includes(idx) ? " " + styles.highlight : "";
  };

  return (
    <main>
      <Head>
        <title>Summary | QSS Demo</title>
      </Head>
      <div className={styles.top_content}>
        <div className={styles.top_form_content}>
          <input
            className={styles.top_form}
            type="number"
            min={1}
            max={5}
            onChange={(e) => handleDocumentForm(e)}
            value={documentId}
          />
          <div className={styles.top_text}>文書ID</div>
        </div>
        <div className={styles.top_form_content}>
          <input
            className={styles.top_form}
            type="number"
            min={1}
            max={1}
            onChange={(e) => handleModelForm(e)}
            value={modelId}
          />
          <div className={styles.top_text}>モデルID</div>
        </div>
        <div className={styles.top_form_content}>
          <SwitchButton value={isDocument} setValue={setIsDocument} />
          <div className={styles.top_text}>{!isDocument ? "要約" : "文書"}</div>
        </div>
      </div>
      {!isDocument &&
        props.outputs
          .filter((_, i) => {
            return (
              queryRange[documentId - 1] <= i && i < queryRange[documentId]
            );
          })
          .map((value, idx) => (
            <div
              key={idx}
              id={`output-${idx}`}
              className={styles.output_content}
            >
              <Accordion
                query={value.query}
                summary={value.summary}
                relevantSpan={value.relevant_span}
                idx={idx}
                handleHighlights={handleHighlights}
              />
            </div>
          ))}
      {isDocument &&
        props.documents[documentId - 1].meeting_transcripts.map(
          (value: string, idx: number) => (
            <div key={idx} id={`turn-${idx}`}>
              <div className={styles.turn_content + highlightClass(idx)}>
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
