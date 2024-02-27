import React, { useEffect, useState } from "react";
import styles from "./board.module.css";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import TaskStatusCard from "../TaskStatusCard/TaskStatusCard";
import CreateTask from "../CreateTask/CreateTask";
import Delete from "../Delete/Delete";
import { changeFilter } from "../../redux/filterSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { backendBaseUrl } from "../../constants";
import Select from "react-select";
function Board() {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const selectedOption = useSelector((state) => state.filter.value);
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
  const options = [
    { value: "week", label: "This Week" },
    { value: "today", label: "Today" },
    { value: "month", label: "This Month" },
  ];

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
        setLoading(true);
        const response = await axios.get(`${backendBaseUrl}/get-name`, {
          headers: headers,
        });
        setUserName(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return window.location.reload();
      }
    }
    getName();
    dispatch(changeFilter("week"));
    // eslint-disable-next-line
  }, []);
  const handleToast = () => {
    return toast("Link Copied");
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      fontFamily: "Poppins light",
      padding: "5px",
      cursor: "pointer",
      fontSize: "0.9rem",
      gap: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      display: "flex",
      fontFamily: "Poppins light",
      fontSize: "0.9rem",
      padding: "10px 30px",
      textAlign: "center",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "White",
      borderRadius: "10px",
      width: "auto",
      whiteSpace: "nowrap",
      position: "absolute",
      right: "30px",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    }),
  };
  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
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
            {/* <select
              defaultValue={"week"}
              style={{
                border: "none",
                fontFamily: "Poppins light",
                padding: "5px",
                cursor: "pointer",
              }}
              onChange={(e) => dispatch(changeFilter(e.target.value))}
            >
              <option value={"week"}>This Week</option>
              <option value={"today"}>Today</option>
              <option value={"month"}>This Month</option>
            </select> */}
            <Select
              // defaultValue={selectedOption}
              isSearchable={false}
              onChange={(selectedOption) =>
                dispatch(changeFilter(selectedOption.value))
              }
              options={options}
              value={selectedOption.value}
              placeholder={"This Week"}
              classNames={styles.customSelect}
              unstyled
              styles={customStyles}
            />
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
                handleToast={handleToast}
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
