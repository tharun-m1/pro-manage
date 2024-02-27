import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { verify } from "../../api/auth";
import Nav from "../../components/Nav/Nav";
import Board from "../../components/Board/Board";
import Analytics from "../../components/Analytics/Analytics";
import { useSelector } from "react-redux";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import { getAllTasks } from "../../api/taskApi";
import { useDispatch } from "react-redux";
import { setTasks } from "../../redux/allTasksSlice";
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useSelector((state) => state.nav.value);
  const navigate = useNavigate();
  const renderComponent = () => {
    if (nav === "board") {
      return <Board />;
    }
    if (nav === "analytics") {
      return <Analytics />;
    }
    if (nav === "settings") {
      return <UpdateForm />;
    }
  };

  useEffect(() => {
    async function Verify() {
      try {
        setLoading(true);
        await verify();
        const response = await getAllTasks();
        dispatch(setTasks(response.data.filteredData));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("You are not LoggedIn");
        localStorage.removeItem("jwToken");
        return navigate("/");
      }
    }
    Verify();
    // eslint-disable-next-line
  }, []);
  if (!localStorage.getItem("jwToken")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.left}>
          <Nav />
        </div>
        <div className={styles.right}>{renderComponent()}</div>
      </div>
    </>
  );
}

export default Dashboard;
