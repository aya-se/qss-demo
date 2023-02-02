import React, { useEffect, useState } from "react";
import styles from "../styles/Accordion.module.scss";
import { motion, useAnimationControls } from "framer-motion";

type PropTypes = {
  idx: number;
  query: string;
  summary: string;
};
const Accordion = ({ query, summary, idx }: PropTypes) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimationControls();
  useEffect(() => {
    if (isExpanded) {
      controls.start({
        height: "100%",
        maxHeight: "100%",
      });
    } else {
      controls.start({
        height: "0",
        maxHeight: "0",
      });
    }
  }, [isExpanded, controls]);

  return (
    <>
      <div
        id={`query-${idx}`}
        className={styles.query_content}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.query_icon}>
          <span>Q</span>
        </div>
        <span className={styles.query_text}>{query}</span>
      </div>
      <motion.div
        id={`answer-${idx}`}
        className={styles.answer_content}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.answer_icon}>
          <span>A</span>
        </div>
        <span className={styles.answer_text}>{summary}</span>
      </motion.div>
    </>
  );
};

export default Accordion;
