import React, { useState } from "react";
import styles from "./auth.module.css";
import art from "../../assets/Art.svg";
import Form from "../../components/Form/Form";
function Register() {
  const [formStatus, setFormStatus] = useState("register");

  const changeFormStatus = () => {
    if (formStatus === "register") return setFormStatus("login");
    return setFormStatus("register");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <div className={styles.circle}>
              <img src={art} alt="art" />
            </div>
          </div>
          <div
            style={{
              fontFamily: "open Sans",
              color: "white",
              fontWeight: "600",
              fontSize: "2rem",
            }}
          >
            Welcome aboard my friend{" "}
          </div>
          <div
            style={{
              fontFamily: "open Sans",
              color: "white",
              fontWeight: "300",
              fontSize: "1rem",
            }}
          >
            just a couple of clicks and we start
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.formContainer}>
            <Form key={formStatus} formStatus={formStatus} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.text}>
              {formStatus === "register"
                ? "Have an account?"
                : "Have no account yet?"}
            </div>
            <div className={styles.btnContainer}>
              <button onClick={changeFormStatus}>
                {formStatus === "register" ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
