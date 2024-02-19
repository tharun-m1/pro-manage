import React from "react";
import styles from "./dashboard.module.css";
import { Navigate } from "react-router-dom";
function Dashboard() {
  if (!localStorage.getItem("jwToken")) {
    return <Navigate to="/" />;
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
