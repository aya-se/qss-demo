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
  const documents_path = path.join(process.cwd(), `public/documents/m_test_${Number(query.d)-1}.json`);

  const data_outputs: any = await fsPromises.readFile(outputs_path);
  const data_document: any = await fsPromises.readFile(documents_path);
  const outputs = JSON.parse(data_outputs);
  const document = JSON.parse(data_document);

  return {
    props: { outputs, document },
  };
};

type Document = {
  meeting_transcripts: Array<string>;
}
type PageProps = {
  outputs: Array<any>;
  document: Document;
};

export default function Summary(props: PageProps) {
  const router = useRouter();
  const query = router.query;
  const [documentId, setDocumentId] = useState<number>(1);
  const [modelType, setModelType] = useState<string>("query+summary");
  const [modelId, setModelId] = useState<number>(1);
  const [isDocument, setIsDocument] = useState<boolean>(false);
  const [relevantTurns, setRelevantTurns] = useState<Array<number>>([]);
  const queryRange = [0, 12, 18, 22, 28, 32, 38, 47, 53, 59, 65, 71, 76, 83, 95, 106, 113, 119, 123, 128, 134, 146, 152, 158, 161, 170, 176, 188, 197, 203, 209, 215, 221, 227, 238, 244];

  const handleDocumentForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setDocumentId(Number(e.target.value));
    router.push(`/summary?d=${e.target.value}&m=${modelId}`);
  };
  const handleModelForm = (e: ChangeEvent<HTMLSelectElement>) => {
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
          <select
            className={styles.top_form}
            onChange={(e) => handleDocumentForm(e)}
          >
            {[...Array(35)].map((_, idx) => (
              <option key={idx} value={idx+1}>
                {idx+1}
              </option>
            ))}
          </select>
          <div className={styles.top_text}>文書ID</div>
        </div>
        <div className={styles.top_form_content}>
          <select
            className={styles.top_form}
            onChange={(e) => setModelId(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
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
        props.document.meeting_transcripts.map(
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
