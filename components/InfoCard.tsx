import styles from "../styles/InfoCard.module.scss";
import Image from "next/image";

type PropTypes = {
  title: string;
  image: string;
  children: React.ReactNode;
};

const InfoCard = ({ title, image, children }: PropTypes) => {
  return (
    <div className={styles.info_card}>
      <Image
        className={styles.info_card_image}
        width={500}
        height={200}
        src={image}
        alt={title}
      />
      <div className={styles.info_card_content}>
        <h3 className={styles.info_card_title}>{title}</h3>
        <p className={styles.info_card_description}>{children}</p>
      </div>
    </div>
  );
};

export default InfoCard;
