import React, { useEffect, useState } from "react";
import styles from "./board.module.css";
import Loading from "../Loading/Loading";
// import down from "../../assets/down.svg";
// import collapse from "../../assets/collapse.svg";
// import add from "../../assets/add.svg";
import { useDispatch } from "react-redux";
import TaskStatusCard from "../TaskStatusCard/TaskStatusCard";
import CreateTask from "../CreateTask/CreateTask";
import Delete from "../Delete/Delete";
import { changeFilter } from "../../redux/filterSlice";
// import { getAllTasks } from "../../api/taskApi";
// import { setTasks } from "../../redux/allTasksSlice";
import axios from "axios";
import { backendBaseUrl } from "../../constants";
function Board() {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const taskStatus = ["Backlog", "Todo", "In Progress", "Done"];
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [userName, setUserName] = useState(null);
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const dispatch = useDispatch();
  const handleModalContent = (state) => {
    setModalContent(state);
  };
  const handleShowModal = (state) => {
    setShowModal(state);
  };
  useEffect(() => {
    async function getName() {
      try {
        const jwToken = localStorage.getItem("jwToken");
        if (!jwToken) {
          return window.location.reload();
        }
        const headers = {
          "Content-Type": "application/json",
          authorization: jwToken,
        };
        const response = await axios.get(`${backendBaseUrl}/get-name`, {
          headers: headers,
        });
        setUserName(response.data.data);
      } catch (err) {
        console.log(err);
        return window.location.reload();
      }
    }
    getName();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.nameContainer}>
          <div>
            Welcome!{" "}
            <span style={{ textTransform: "capitalize" }}>
              {userName || "Guest"}
            </span>{" "}
          </div>
          <div>{formattedDate}</div>
        </div>
        <div className={styles.titleContainer}>
          <div>Board</div>
          <div>
            {/* This week <img src={down} /> */}
            <select
              style={{ border: "none" }}
              onChange={(e) => dispatch(changeFilter(e.target.value))}
            >
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
            return (
              <TaskStatusCard
                handleModalContent={handleModalContent}
                handleShowModal={handleShowModal}
                key={el}
                status={el}
              />
            );
          })}
        </div>
        {showModal ? (
          <div className={styles.modal}>
            {modalContent === "create" || modalContent === "edit" ? (
              <CreateTask
                handleShowModal={handleShowModal}
                modalContent={modalContent}
              />
            ) : (
              ""
            )}
            {modalContent === "delete" ? (
              <Delete handleShowModal={handleShowModal} />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Board;
