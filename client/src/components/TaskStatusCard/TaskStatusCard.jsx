import React, { useEffect, useState } from "react";
import styles from "./taskstatuscard.module.css";
import collapse from "../../assets/collapse.svg";
import add from "../../assets/add.svg";
import TaskCard from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";

function TaskStatusCard({
  status,
  handleShowModal,
  handleModalContent,
  handleToast,
}) {
  const [collapseAll, setCollapseAll] = useState(true);
  const data = useSelector((state) => state.allTasks.value);
  const timeFilter = useSelector((state) => state.filter.value);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status === "Backlog" && data.backlog) {
      if (timeFilter === "week") {
        const newData = data.backlog.filter((task) => {
          return isWithinLastWeek(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "today") {
        const newData = data.backlog.filter((task) => {
          return isToday(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "month") {
        const newData = data.backlog.filter((task) => {
          return isWithinLastMonth(task.createdAt.toString());
        });
        setTasks(newData);
      }
    }
    if (status === "Done" && data.done) {
      if (timeFilter === "week") {
        const newData = data.done.filter((task) => {
          return isWithinLastWeek(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "today") {
        const newData = data.done.filter((task) => {
          return isToday(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "month") {
        const newData = data.done.filter((task) => {
          return isWithinLastMonth(task.createdAt.toString());
        });
        setTasks(newData);
      }
    }
    if (status === "Todo" && data.todo) {
      if (timeFilter === "week") {
        const newData = data.todo.filter((task) => {
          return isWithinLastWeek(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "today") {
        const newData = data.todo.filter((task) => {
          return isToday(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "month") {
        const newData = data.todo.filter((task) => {
          return isWithinLastMonth(task.createdAt.toString());
        });
        setTasks(newData);
      }
    }
    if (status === "In Progress" && data.progress) {
      if (timeFilter === "week") {
        const newData = data.progress.filter((task) => {
          return isWithinLastWeek(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "today") {
        const newData = data.progress.filter((task) => {
          return isToday(task.createdAt.toString());
        });
        setTasks(newData);
      }
      if (timeFilter === "month") {
        const newData = data.progress.filter((task) => {
          return isWithinLastMonth(task.createdAt.toString());
        });
        setTasks(newData);
      }
    }
  }, [data, status, timeFilter]);

  const handleCollapse = () => {
    setCollapseAll(!collapseAll);
  };
  const handleCreateTask = () => {
    handleShowModal(true);
    handleModalContent("create");
  };
  function isWithinLastWeek(dateStr) {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const difference = currentDate.getTime() - date.getTime();
    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
    return difference <= oneWeekInMillis;
  }
  function isToday(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  function isWithinLastMonth(dateStr) {
    const date = new Date(dateStr);
    const currentDate = new Date();
    const difference = currentDate.getTime() - date.getTime();
    const oneWeekInMillis = 30 * 24 * 60 * 60 * 1000;
    return difference <= oneWeekInMillis;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div>{status}</div>
          <div>
            {status === "Todo" ? (
              <img
                onClick={handleCreateTask}
                width={"20px"}
                style={{ marginRight: "15px", cursor: "pointer" }}
                src={add}
                alt="add task"
              />
            ) : (
              ""
            )}
            <img
              onClick={handleCollapse}
              width={"30px"}
              src={collapse}
              alt="collapse"
            />
          </div>
        </div>
        <div className={styles.tasksContainer}>
          {tasks?.map((task, idx) => {
            return (
              <TaskCard
                key={task._id}
                handleModalContent={handleModalContent}
                handleCollapse={handleCollapse}
                collapseAll={collapseAll}
                handleShowModal={handleShowModal}
                task={task}
                handleToast={handleToast}
              />
            );
          })}
          {/* {status === "Todo"
            ? data.todo.map((task) => {
                return (
                  <TaskCard
                    key={task._id}
                    handleModalContent={handleModalContent}
                    handleCollapse={handleCollapse}
                    collapseAll={collapseAll}
                    handleShowModal={handleShowModal}
                    task={task}
                  />
                );
              })
            : ""}
          {status === "In Progress"
            ? data.progress.map((task) => {
                return (
                  <TaskCard
                    key={task._id}
                    handleModalContent={handleModalContent}
                    handleCollapse={handleCollapse}
                    collapseAll={collapseAll}
                    handleShowModal={handleShowModal}
                    task={task}
                  />
                );
              })
            : ""}
          {status === "Done"
            ? data.done.map((task) => {
                return (
                  <TaskCard
                    key={task._id}
                    handleModalContent={handleModalContent}
                    handleCollapse={handleCollapse}
                    collapseAll={collapseAll}
                    handleShowModal={handleShowModal}
                    task={task}
                  />
                );
              })
            : ""}
          {status === "Backlog"
            ? data.backlog.map((task) => {
                return (
                  <TaskCard
                    key={task._id}
                    handleModalContent={handleModalContent}
                    handleCollapse={handleCollapse}
                    collapseAll={collapseAll}
                    handleShowModal={handleShowModal}
                    task={task}
                  />
                );
              })
            : ""} */}
        </div>
      </div>
    </>
  );
}

export default TaskStatusCard;
