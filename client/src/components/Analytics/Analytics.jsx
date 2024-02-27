import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { getAnalytics } from "../../api/taskApi";
import Loading from "../Loading/Loading";
function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await getAnalytics();
        console.log(response.data.filteredData);
        setAnalytics(response.data.filteredData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("Something went wrong");
        return window.location.reload();
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.caption}>Analytics</div>
        <div className={styles.dataContainer}>
          <div className={styles.statusData}>
            <div className={styles.status}>
              <div></div>
              <div>Backlog Tasks</div>
              <div>{analytics?.backlog || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>To-do Tasks</div>
              <div>{analytics?.todo || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>In-Progress Tasks</div>
              <div>{analytics?.progress || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Completed Tasks</div>
              <div>{analytics?.done || "0"}</div>
            </div>
          </div>
          <div className={styles.statusData}>
            <div className={styles.status}>
              <div></div>
              <div>Low Priority</div>
              <div>{analytics?.lo || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Moderate Priority</div>
              <div>{analytics?.mod || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>High Priority</div>
              <div>{analytics?.hi || "0"}</div>
            </div>
            <div className={styles.status}>
              <div></div>
              <div>Due Date Tasks</div>
              <div>{analytics?.due || "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
