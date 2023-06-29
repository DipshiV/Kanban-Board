import styles from "./Page.module.css";
import Board from "../board/Board";
import Navbar from "../navbar/Navbar";
const Page = () => {
  return (
    <>
      <div className={styles.header}>
        <div style={{ width: "100%" }}><Navbar/></div>
      </div>
      <Board />
    </>
  );
};

export default Page;