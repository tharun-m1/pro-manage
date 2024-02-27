import React, { useEffect, useState } from "react";
import styles from "./publicpage.module.css";
import logo from "../../assets/logo.svg";
import axios from "axios";
import { backendBaseUrl } from "../../constants";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
function PublicPage() {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const getPriority = () => {
    if (task?.priority === "hi") return "High Priority";

    if (task?.priority === "lo") return "Low Priority";

    if (task?.priority === "mod") return "Moderate Priority";
  };
  const getColor = () => {
    if (task?.priority === "hi") return "#FF2473";

    if (task?.priority === "lo") return "#63C05B";

    if (task?.priority === "mod") return "#18B0FF";
  };
  const getMarked = () => {
    const marked = task?.checklist.filter((item) => item.status === "done");
    return marked?.length;
  };
  useEffect(() => {
    async function getTask() {
      try {
        setLoading(true);
        const res = await axios.get(`${backendBaseUrl}/public/${taskId}`);
        console.log(res.data.data[0]);
        setTask(res.data.data[0]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getTask();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles.container}>
        {loading && !task ? <Loading /> : ""}
        <div className={styles.logo}>
          <img width={"30px"} src={logo} alt="logo" />
          <span>Pro Manage</span>
        </div>
        <div className={styles.card}>
          <div className={styles.priority}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: getColor(),
              }}
            ></div>
            <div>{getPriority()}</div>
          </div>
          <div className={styles.hero}> {task?.title} </div>
          <div className={styles.checklistHead}>
            <div>
              Checklist ({getMarked()}/{task?.checklist.length})
            </div>
          </div>
          <div className={styles.checklistBody}>
            {task?.checklist?.map((el) => {
              return (
                <div key={el} className={styles.checklistItem}>
                  <div style={{ overflowX: "hidden" }}>
                    <input
                      checked={el.status === "done" ? true : false}
                      style={{
                        cursor: "not-allowed",
                        overflow: "hidden",
                      }}
                      type="checkbox"
                    />
                  </div>
                  <div> {el.task} </div>
                </div>
              );
            })}
          </div>
          {task?.dueDate ? (
            <div className={styles.footer}>
              <div>Due Date</div>
              {task?.dueDate ? (
                <div>
                  {new Date(task.dueDate).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default PublicPage;
