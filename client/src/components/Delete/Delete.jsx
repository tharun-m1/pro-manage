import React, { useState } from "react";
import styles from "./delete.module.css";
import { deleteTask } from "../../api/taskApi";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
function Delete({ handleShowModal }) {
  const deleteId = useSelector((state) => state.edit.value);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    handleShowModal(false);
    return;
  };
  const handleDelete = async () => {
    try {
      const taskId = deleteId;
      setLoading(true);
      await deleteTask(taskId);
      setLoading(false);
      alert("Task Deleted");
      handleShowModal(false);
      return window.location.reload();
    } catch (err) {
      setLoading(false);
      localStorage.removeItem("jwToken");
      return window.location.reload();
    }
  };
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div>Are you sure you want to Delete?</div>
        <div>
          <button onClick={handleDelete}>Yes, Delete</button>
        </div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default Delete;
