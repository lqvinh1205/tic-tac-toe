import { useState } from "react";
import styles from "./App.module.css";
import Square from "./components/square";

function App() {
  const [status, setStatus] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const handleClick = (i) => {
    setCount(count + 1);
    calculateWinner(squares);
    if (calculateWinner(squares) || squares[i]) {
      if (calculateWinner(squares)) reset();
      return;
    }
    const square = squares;
    square[i] = status ? "X" : "O";
    setSquares(square);
    setStatus(!status);
  };
  // console.log(squares);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // setTimeout(() => {
        //   window.alert("Bên " + squares[a] + " chiến thắng");
        // }, 100);
        return squares[a];
      }
    }
    return null;
  }
  const reset = () => {
    const confirm = window.confirm("Bạn có muốn reset game ?");
    if (confirm) setSquares(Array(9).fill(null));
    setCount(0)
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.isNext}>
          <h3>Lượt kế tiếp: {status ? "X" : "O"}</h3>
        </div>
        {squares.map((item, index) => (
          <Square
            key={index}
            index={index}
            value={item}
            click={() => handleClick(index)}
            color={(item === "X" && "red") || (item === "O" && "blue")}
          />
        ))}

        <div className={styles.footer}>
          <button onClick={reset} className={styles["btnReset"]}>
            Chơi lại
          </button>
        </div>
      </div>
      <div
        className={styles.model}
        style={{
          display: calculateWinner(squares) || !squares.includes(null) ? "flex" : "none",
        }}
      >
        {calculateWinner(squares)
          ? "Chúc mừng bên " + calculateWinner(squares) + "  thắng"
          : " "}
        {!calculateWinner(squares) && !squares.includes(null) ? "Hòa" : ""}
        <div className={styles.footerModel}>
          <button className={styles.btnReset} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
