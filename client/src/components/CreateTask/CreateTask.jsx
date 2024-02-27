import React, { useEffect, useState } from "react";
import styles from "./createtask.module.css";
import Delete from "../../assets/Delete.svg";
import add from "../../assets/add.svg";
import Loading from "../Loading/Loading";
import { createTask, getTask, updateTask } from "../../api/taskApi";
import { useSelector } from "react-redux";
function CreateTask({ handleShowModal, modalContent }) {
  const [loading, setLoading] = useState(false);
  const editTaskId = useSelector((state) => state.edit.value);
  const initialTaskState = {
    title: "",
    priority: "",
    checklist: [],
    dueDate: null,
  };
  const checklistItem = {
    task: "",
    status: "not",
  };
  const [taskData, setTaskData] = useState(initialTaskState);
  const handleTitleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    const updatedData = { ...taskData };
    const { checklist } = updatedData;
    if (checklist.length > 0 && checklist[checklist.length - 1].task === "") {
      return alert("Add task name");
    }
    updatedData.checklist.push(checklistItem);
    setTaskData(updatedData);
  };
  const handleChecklistItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = { ...taskData };
    const { checklist } = updatedData;
    if (name === "status") {
      checklist[index].status = e.target.checked ? "done" : "not";
    } else {
      checklist[index][name] = value;
    }
    setTaskData(updatedData);
  };
  const handleDelete = (index) => {
    const updatedData = { ...taskData };
    const { checklist } = updatedData;
    checklist.splice(index, 1);
    setTaskData(updatedData);
  };
  const handleCancel = () => {
    return handleShowModal(false);
  };
  const handleSave = async () => {
    try {
      let { title, priority, dueDate, checklist } = taskData;
      title = title.trim();
      if (title === "") {
        return alert("Title required");
      }
      if (priority === "") {
        return alert("Select a priority");
      }
      if (checklist.length === 0) {
        return alert("Atleast 1 checklist Item required");
      }
      for (let el of checklist) {
        el.task = el.task.trim();
        if (el.task === "") {
          return alert("Task required");
        }
      }
      const payload = {
        title,
        priority,
        dueDate,
        checklist,
      };
      setLoading(true);
      if (modalContent === "edit") {
        const taskId = editTaskId;
        await updateTask(payload, taskId);
        alert("Task Updated");
        setLoading(false);
        handleShowModal(false);
        return window.location.reload();
      } else {
        await createTask(payload);
        setLoading("false");
        handleShowModal(false);
        alert("Task Created.");
        return window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.status >= 500) {
        localStorage.removeItem("jwToken");
      }
      return window.location.reload();
    }
  };
  useEffect(() => {
    if (modalContent === "edit") {
      fetchTask();
    }
    async function fetchTask() {
      try {
        const taskId = editTaskId;
        setLoading(true);
        const response = await getTask(taskId);
        setTaskData(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        window.location.reload();
        return alert("Something went wrong in getting task");
      }
    }

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.title}>
          <div>
            Title <sup>*</sup>
          </div>
          <div>
            {" "}
            <input
              onChange={(e) => handleTitleChange(e)}
              value={taskData.title}
              name="title"
              placeholder="Enter Task Title"
              type="text"
            />{" "}
          </div>
        </div>
        <div className={styles.priorityContainer}>
          <div>
            Select Priority <sup>*</sup>
          </div>
          <div
            style={{
              backgroundColor: taskData.priority === "hi" ? "#EEECEC" : "",
            }}
            onClick={() => setTaskData({ ...taskData, priority: "hi" })}
          >
            <div
              style={{
                backgroundColor: "#FF2473",
              }}
              className={styles.circle}
            ></div>
            HIGH PRIORITY
          </div>
          <div
            style={{
              backgroundColor: taskData.priority === "mod" ? "#EEECEC" : "",
            }}
            onClick={() => setTaskData({ ...taskData, priority: "mod" })}
          >
            {" "}
            <div
              style={{
                backgroundColor: "#18B0FF",
              }}
              className={styles.circle}
            ></div>
            MODERATE PRIORITY
          </div>
          <div
            style={{
              backgroundColor: taskData.priority === "lo" ? "#EEECEC" : "",
            }}
            onClick={() => setTaskData({ ...taskData, priority: "lo" })}
          >
            {" "}
            <div
              style={{
                backgroundColor: "#63C05B",
              }}
              className={styles.circle}
            ></div>
            LOW PRIORITY
          </div>
        </div>
        <div
          style={{ fontFamily: "Inter", fontSize: "1rem", padding: "5px 0px" }}
        >
          Checklist (
          {taskData.checklist.filter((el) => el.status === "done").length}/
          {taskData.checklist.length > 0 ? taskData.checklist.length : "0"})
          <sup>*</sup>
        </div>
        <div className={styles.body}>
          {taskData.checklist.map((el, index) => {
            return (
              <div key={index} className={styles.inputCont}>
                <div>
                  <input
                    onChange={(e) => handleChecklistItemChange(e, index)}
                    key={index}
                    name="status"
                    checked={
                      taskData.checklist[index].status === "done" ? true : false
                    }
                    style={{
                      fontFamily: "Poppins light",
                      accentColor: "#17A2B8",
                    }}
                    type="checkbox"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => handleChecklistItemChange(e, index)}
                    name="task"
                    value={taskData.checklist[index].task}
                    placeholder="Type..."
                    type="text"
                  />
                </div>
                <div>
                  {" "}
                  <img
                    key={index}
                    onClick={() => handleDelete(index)}
                    style={{ cursor: "pointer" }}
                    width={"20px"}
                    src={Delete}
                    alt="delete task"
                  />{" "}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.addNew}>
          <button onClick={handleAdd}>
            {" "}
            <img width={"20px"} src={add} alt="add task" /> <div>Add New</div>
          </button>
        </div>
        <div className={styles.btnContainer}>
          <div>
            {" "}
            <input
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              name="dueDate"
              type="date"
            />{" "}
          </div>
          <div>
            {" "}
            <button
              onClick={handleCancel}
              style={{ color: "#CF3636", border: "1px solid #CF3636" }}
            >
              Cancel
            </button>{" "}
          </div>
          <div>
            {" "}
            <button
              onClick={handleSave}
              style={{ color: "#ffffff", backgroundColor: "#17A2B8" }}
            >
              Save
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
