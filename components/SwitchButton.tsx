import styles from "../styles/SwitchButton.module.scss";

type PropTypes = {
  value: boolean;
  setValue: any;
};

const SwitchButton = ({ value, setValue }: PropTypes) => {
  return (
    <div className={styles.toggle_button}>
      <input
        id="toggle"
        className={styles.toggle_input}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
      <label htmlFor="toggle" className={styles.toggle_label} />
    </div>
  );
};

export default SwitchButton;
