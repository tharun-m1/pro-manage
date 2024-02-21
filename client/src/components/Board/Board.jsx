import React, { useState } from "react";
import styles from "./board.module.css";
import Loading from "../Loading/Loading";
import down from "../../assets/down.svg";
// import collapse from "../../assets/collapse.svg";
// import add from "../../assets/add.svg";
import TaskStatusCard from "../TaskStatusCard/TaskStatusCard";
function Board() {
  const [loading, setLoading] = useState(false);
  const taskStatus = ["Backlog", "Todo", "In Progress", "Done"];
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.nameContainer}>
          <div>Welcome! Tharun</div>
          <div>20 Feb, 2024</div>
        </div>
        <div className={styles.titleContainer}>
          <div>Board</div>
          <div>
            {/* This week <img src={down} /> */}
            <select>
              <option selected value={"week"}>
                This Week
              </option>
              <option value={"today"}>Today</option>
              <option value={"month"}>This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.taskStatusContainer}>
          {taskStatus.map((el) => {
            return <TaskStatusCard key={el} status={el} />;
          })}
          {/* <div className={styles.taskStatus}>
            <div>Backlog</div>
            <div>
              <img width={"30px"} src={collapse} alt="collapse" />
            </div>
          </div>
          <div className={styles.taskStatus}>
            <div>Todo</div>
            <div>
              <img
                width={"20px"}
                style={{ marginRight: "15px", cursor: "pointer" }}
                src={add}
                alt="add task"
              />
              <img width={"30px"} src={collapse} alt="collapse" />
            </div>
          </div>
          <div className={styles.taskStatus}>
            <div>In Progress</div>
            <div>
              <img width={"30px"} src={collapse} alt="collapse" />
            </div>
          </div>
          <div className={styles.taskStatus}>
            <div>Done</div>
            <div>
              <img width={"30px"} src={collapse} alt="collapse" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Board;
