import React, { useEffect, useState } from "react";
import styles from "./taskcard.module.css";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
function TaskCard({ handleCollapse }) {
  const arr = Array(3).fill(1);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(false);
  }, [handleCollapse]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.priority}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#FF2473",
              }}
            ></div>
            <div>High Priority</div>
          </div>
          <div>...</div>
        </div>
        <div className={styles.hero}>Hero Section</div>
        <div className={styles.checklist}>
          <div className={styles.checklistHead}>
            <div>Checklist (0/0)</div>
            <div style={{ display: display ? "none" : "flex" }}>
              <img
                style={{ cursor: "pointer" }}
                width={"30px"}
                src={arrowDown}
                onClick={() => setDisplay(true)}
              />
            </div>
            <div style={{ display: display ? "flex" : "none" }}>
              <img
                onClick={() => setDisplay(false)}
                style={{ cursor: "pointer" }}
                width={"30px"}
                src={arrowUp}
              />
            </div>
          </div>
          <div
            style={{ display: display ? "block" : "none" }}
            className={styles.checklistBody}
          >
            {arr.map((el) => {
              return (
                <div className={styles.checklistItem}>
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div> Task to be done</div>
                </div>
              );
            })}
          </div>
          <div className={styles.checklistFooter}>
            <div>Due Date</div>
            <div>Todo</div>
            <div>Backlog</div>
            <div>In Progress</div>
            {/* <div>Done</div> */}
          </div>
        </div>
        <div className={styles.status}></div>
      </div>
    </>
  );
}

export default TaskCard;
