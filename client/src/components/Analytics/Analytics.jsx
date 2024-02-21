import React from "react";
import styles from "./analytics.module.css";
function Analytics() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.caption}>Analytics</div>
        <div className={styles.dataContainer}>
          <div className={styles.statusData}>
            <div className={styles.status}>
              <div></div>
              <div>Backlog Tasks</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>To-do Tasks</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>In-Progress Tasks</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Completed Tasks</div>
              <div>20</div>
            </div>
          </div>
          <div className={styles.statusData}>
            <div className={styles.status}>
              <div></div>
              <div>Low Priority</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Moderate Priority</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>High Priority</div>
              <div>20</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Due Date Tasks</div>
              <div>20</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
