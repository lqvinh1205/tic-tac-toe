import styles from "./square.module.css";
const Square = ({ click, value, color }) => {
  const handleClick = () => {

    click();
  };
  return (
    <button
      className={styles.box}
      onClick={handleClick}
      style={{ background: color }}
    >
      {value}
    </button>
  );
};

export default Square;
