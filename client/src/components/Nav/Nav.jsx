import React, { useState } from "react";
import styles from "./nav.module.css";
import logo from "../../assets/logo.svg";
import board from "../../assets/layout.svg";
import analytics from "../../assets/database.svg";
import settings from "../../assets/settings.svg";
import logout from "../../assets/Logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeNav } from "../../redux/navSlice";
// import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";
function Nav() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const navigate = useNavigate();
  const nav = useSelector((state) => state.nav.value);
  const dispatch = useDispatch();
  const handleLogoutModal = (state) => {
    setShowDeleteModal(state);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img width={"30px"} src={logo} alt="logo" />
          <span>Pro Manage</span>
        </div>

        <div
          onClick={() => dispatch(changeNav("board"))}
          style={{
            backgroundColor: nav === "board" ? "#4391ED1A" : "",
            color: nav === "board" ? "black" : "",
          }}
          className={styles.board}
        >
          <img width={"30px"} src={board} alt="board" />
          <span>Board</span>
        </div>
        <div
          onClick={() => dispatch(changeNav("analytics"))}
          style={{
            backgroundColor: nav === "analytics" ? "#4391ED1A" : "",
            color: nav === "analytics" ? "black" : "",
          }}
          className={styles.analytics}
        >
          <img width={"30px"} src={analytics} alt="analytics" />
          <span>Analytics</span>
        </div>
        <div
          onClick={() => dispatch(changeNav("settings"))}
          style={{
            backgroundColor: nav === "settings" ? "#4391ED1A" : "",
            color: nav === "settings" ? "black" : "",
          }}
          className={styles.settings}
        >
          <img src={settings} alt="settings" />
          <span>Settings</span>
        </div>
        <div onClick={() => handleLogoutModal(true)} className={styles.logout}>
          <img width={"30px"} src={logout} alt="analytics" />
          <span>Log out</span>
        </div>
        {showDeleteModal ? (
          <div className={styles.modal}>
            <Logout handleLogoutModal={handleLogoutModal} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Nav;
