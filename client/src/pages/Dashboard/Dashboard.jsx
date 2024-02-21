import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { verify } from "../../api/auth";
import Nav from "../../components/Nav/Nav";
import Board from "../../components/Board/Board";
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function Verify() {
      try {
        setLoading(true);
        await verify();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("You are not LoggedIn");
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
        <div className={styles.right}>
          <Board />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
