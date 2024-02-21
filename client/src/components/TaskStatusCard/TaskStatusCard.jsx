import React, { useState } from "react";
import styles from "./taskstatuscard.module.css";
import collapse from "../../assets/collapse.svg";
import add from "../../assets/add.svg";
import TaskCard from "../TaskCard/TaskCard";
function TaskStatusCard({ status }) {
  const [collapseAll, setCollapseAll] = useState(false);

  const handleCollapse = (state) => {
    setCollapseAll(state);
  };
  const arr = Array(1).fill(1);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div>{status}</div>
          <div>
            {status === "Todo" ? (
              <img
                width={"20px"}
                style={{ marginRight: "15px", cursor: "pointer" }}
                src={add}
                alt="add task"
              />
            ) : (
              ""
            )}
            <img
              onClick={() => handleCollapse(!collapseAll)}
              width={"30px"}
              src={collapse}
              alt="collapse"
            />
          </div>
        </div>
        <div className={styles.tasksContainer}>
          {arr.map((el) => {
            return (
              <TaskCard
                handleCollapse={handleCollapse}
                collapseAll={collapseAll}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TaskStatusCard;
