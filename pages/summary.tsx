import Head from "next/head";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { ChangeEvent, useState } from "react";
import styles from "../styles/Summary.module.scss";
import { GetServerSidePropsContext } from "next";
import Accordion from "../components/Accordion";
import SwitchButton from "../components/SwitchButton";

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  query.d = query.d || "1";
  query.m = query.m || "SegEnc";
  const outputs_path = path.join(
    process.cwd(),
    `public/outputs/${query.m}.json`
  );
  const documents_path = path.join(
    process.cwd(),
    `public/documents/m_test_${Number(query.d) - 1}.json`
  );
  const data_outputs: any = await fsPromises.readFile(outputs_path);
  const data_document: any = await fsPromises.readFile(documents_path);
  const queryRange = [
    0, 12, 18, 22, 28, 32, 38, 47, 53, 59, 65, 71, 76, 83, 95, 106, 113, 119,
    123, 128, 134, 146, 152, 158, 161, 170, 176, 188, 197, 203, 209, 215, 221,
    227, 238, 244,
  ];
  const outputs = JSON.parse(data_outputs).filter((_: any, i: number) => {
    return (
      queryRange[Number(query.d) - 1] <= i && i < queryRange[Number(query.d)]
    );
  });
  const document = JSON.parse(data_document);

  return {
    props: { outputs, document },
  };
};

type Document = {
  meeting_transcripts: Array<string>;
};
type PageProps = {
  outputs: Array<any>;
  document: Document;
};

export default function Summary(props: PageProps) {
  const router = useRouter();
  const query = router.query;
  query.d = query.d || "1";
  query.m = query.m || "SegEnc";
  const models = [
    "SegEnc",
    "LED",
    "SegEnc(No Span)",
    "LED(No Span)",
    "SegEnc(Filter)",
    "SegEnc(Gold)",
  ];
  const [isDocument, setIsDocument] = useState<boolean>(false);
  const [relevantTurns, setRelevantTurns] = useState<Array<number>>([]);

  const handleDocumentForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setRelevantTurns([]);
    router.push(`/summary?d=${e.target.value}&m=${query.m}`);
  };
  const handleModelForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setRelevantTurns([]);
    router.push(`/summary?d=${query.d}&m=${e.target.value}`);
  };
  const handleHighlights = (relevantSpan: Array<number>) => {
    setRelevantTurns(relevantSpan);
    setIsDocument(true);
    if (relevantSpan.length > 0) {
      router.push(`/summary?d=${query.d}&m=${query.m}#turn-${relevantSpan[0]}`);
    }
  };

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
              <option
                key={idx}
                value={idx + 1}
                selected={idx + 1 === Number(query.d)}
              >
                {idx + 1}
              </option>
            ))}
          </select>
          <div className={styles.top_text}>文書ID</div>
        </div>
        <div className={styles.top_form_content}>
          <select
            className={`${styles.top_form} ${styles.top_form_longer}`}
            onChange={(e) => handleModelForm(e)}
          >
            {models.map((value, idx) => (
              <option key={idx} value={value} selected={value === query.m}>
                {value}
              </option>
            ))}
          </select>
          <div className={styles.top_text}>モデルID</div>
        </div>
        <div className={styles.top_form_content}>
          <SwitchButton value={isDocument} setValue={setIsDocument} />
          <div className={styles.top_text}>{!isDocument ? "要約" : "文書"}</div>
        </div>
      </div>
      {!isDocument &&
        props.outputs.map((value, idx) => (
          <div key={idx} id={`output-${idx}`} className={styles.output_content}>
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
        props.document.meeting_transcripts.map((value: string, idx: number) => (
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
        ))}
    </main>
  );
}
