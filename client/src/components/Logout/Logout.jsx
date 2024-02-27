import React from "react";
import styles from "./logout.module.css";
import { useNavigate } from "react-router-dom";
function Logout({ handleLogoutModal }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    return handleLogoutModal(false);
  };
  const logout = () => {
    localStorage.removeItem("jwToken");
    navigate("/");
    return window.location.reload();
  };
  return (
    <>
      <div className={styles.container}>
        <div>Are you sure you want to Logout?</div>
        <div>
          <button onClick={logout}>Yes, Logout</button>
        </div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default Logout;
