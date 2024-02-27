import React, { useEffect, useState } from "react";
import styles from "./taskcard.module.css";
import arrowUp from "../../assets/arrowUp.svg";
import arrowDown from "../../assets/arrowDown.svg";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeChecklistItemStatus,
  changeTaskStatus,
  getAllTasks,
} from "../../api/taskApi";
import { useDispatch } from "react-redux";
import { setTasks } from "../../redux/allTasksSlice";
import { editTaskId } from "../../redux/editSlice";
import { frontendBaseUrl } from "../../constants";
function TaskCard({
  collapseAll,
  handleCollapse,
  handleModalContent,
  handleShowModal,
  task,
}) {
  const [display, setDisplay] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  // eslint-disable-next-line
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setDisplay(false);
  }, [handleCollapse]);

  const handleSelectedOption = (e, value) => {
    e.stopPropagation();
    setSelectedOption(value);
  };
  const getPriority = () => {
    if (task.priority === "hi") return "High Priority";

    if (task.priority === "lo") return "Low Priority";

    if (task.priority === "mod") return "Moderate Priority";
  };
  const getColor = () => {
    if (task.priority === "hi") return "#FF2473";

    if (task.priority === "lo") return "#63C05B";

    if (task.priority === "mod") return "#18B0FF";
  };
  const overDue = () => {
    const now = new Date();
    const due = new Date(task.dueDate);
    if (due < now) {
      return true;
    }
    return false;
  };
  const handleChangeStatus = async (newStatus) => {
    try {
      // console.log("ex");
      setLoading(true);
      await changeTaskStatus(newStatus, task._id);
      const allTasks = await getAllTasks();
      dispatch(setTasks(allTasks.data.filteredData));
      setLoading(false);
      // return window.location.reload();
    } catch (err) {
      setLoading(false);
      console.log(err);
      return alert("Something went wrong");
    }
  };
  const handleChecklist = async (e, itemId) => {
    try {
      // console.log(e.target.value);
      setLoading(true);
      await changeChecklistItemStatus(e.target.checked, task._id, itemId);
      const allTasks = await getAllTasks();
      dispatch(setTasks(allTasks.data.filteredData));
      setLoading(false);
      // return window.location.reload();
    } catch (err) {
      setLoading(false);
      return window.location.reload();
    }
  };
  const getMarked = () => {
    const marked = task.checklist.filter((item) => item.status === "done");
    return marked.length;
  };
  // const handleShare = async (e, taskId) => {
  //   try {
  //     e.stopPropagation();

  //     await navigator.clipboard.writeText(
  //       `${frontendBaseUrl}/public/${taskId}`
  //     );
  //     setShowOptions(false);
  //     toast("Link Copied");
  //     console.log("Share executed");
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //     return window.location.reload();
  //   }
  // };
  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        {loading ? <Loading /> : ""}
        <div style={{ position: "absolute" }}> </div>
        <div className={styles.head}>
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
            style={{ position: "relative" }}
          >
            ...{" "}
            {showOptions ? (
              <div className={styles.options}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedOption(e, "edit");
                    dispatch(editTaskId(task._id));
                    handleModalContent("edit");
                    handleShowModal(true);
                  }}
                >
                  Edit{" "}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedOption(e, "share");
                    navigator.clipboard
                      .writeText(`${frontendBaseUrl}/public/${task._id}`)
                      .then(() => {
                        toast("Link Copied");
                      })
                      .catch((err) => {
                        console.log(err);
                        return window.location.reload();
                      });
                  }}
                >
                  Share{" "}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedOption(e, "delete");
                    handleModalContent("delete");
                    handleShowModal(true);
                    dispatch(editTaskId(task._id));
                  }}
                >
                  Delete{" "}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.hero}>{task?.title}</div>
        <div className={styles.checklist}>
          <div className={styles.checklistHead}>
            <div>
              Checklist ({getMarked()}/{task.checklist.length})
            </div>
            <div style={{ display: display ? "none" : "flex" }}>
              <img
                alt="down"
                style={{ cursor: "pointer" }}
                width={"30px"}
                src={arrowDown}
                onClick={() => setDisplay(true)}
              />
            </div>
            <div style={{ display: display ? "flex" : "none" }}>
              <img
                alt="up"
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
            {task?.checklist?.map((el) => {
              return (
                <div key={el._id} className={styles.checklistItem}>
                  <div style={{ overflowX: "hidden" }}>
                    <input
                      style={{ cursor: "pointer", overflow: "hidden" }}
                      checked={el.status === "done" ? true : false}
                      type="checkbox"
                      onChange={(e) => handleChecklist(e, el._id)}
                    />
                  </div>
                  <div> {el.task}</div>
                </div>
              );
            })}
          </div>
          <div className={styles.checklistFooter}>
            {task?.dueDate ? (
              <div
                style={{
                  fontWeight: "700",
                  background:
                    overDue() && task.status !== "done"
                      ? "#CF3636"
                      : task.status === "done"
                      ? "#63C05B"
                      : "",
                  color: task.status === "done" || overDue() ? "#FFFFFF" : "",
                }}
              >
                {new Date(task.dueDate).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            ) : (
              <div style={{ background: "none", cursor: "auto" }}></div>
            )}
            {task?.status !== "todo" ? (
              <div onClick={() => handleChangeStatus("todo")}>Todo</div>
            ) : (
              ""
            )}
            {task?.status !== "backlog" ? (
              <div onClick={() => handleChangeStatus("backlog")}>Backlog</div>
            ) : (
              ""
            )}
            {task?.status !== "progress" ? (
              <div onClick={() => handleChangeStatus("progress")}>
                In Progress
              </div>
            ) : (
              ""
            )}
            {task?.status !== "done" ? (
              <div onClick={() => handleChangeStatus("done")}>Done</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.status}></div>
      </div>
    </>
  );
}

export default TaskCard;
