import React, { useEffect, useRef, useState } from "react";
import styles from "./form.module.css";
import profile from "../../assets/Profile.svg";
import emailIcon from "../../assets/email.svg";
import lock from "../../assets/lock.svg";
import eye from "../../assets/eye.svg";
import Loading from "../Loading/Loading";
import { register, login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
function RegisterForm({ formStatus }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const confirmRef = useRef(null);
  const passwordRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    lengthError: false,
    matchError: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setErrors({ ...errors, name: false });
    if (name === "confirmPassword" || name === "password")
      setErrors({ ...errors, lengthError: false, matchError: false });
    setFormData({ ...formData, [name]: value });
  };
  const getFromTitle = () => {
    if (formStatus === "register") return "Register";
    if (formStatus === "login") return "Login";
  };
  const getButtonName = () => {
    if (formStatus === "register") return "Register";
    if (formStatus === "login") return "Login";
  };
  const isRequired = () => {
    if (formStatus === "register") return true;
    return false;
  };
  const handleConfirmRef = () => {
    if (confirmRef.current.type === "password") {
      return (confirmRef.current.type = "text");
    }
    if (confirmRef.current.type === "text") {
      return (confirmRef.current.type = "password");
    }
  };
  const handlePasswordRef = () => {
    if (passwordRef.current.type === "password") {
      return (passwordRef.current.type = "text");
    }
    if (passwordRef.current.type === "text") {
      return (passwordRef.current.type = "password");
    }
  };
  useEffect(() => {
    if (formStatus === "register") {
      confirmRef.current.type = "password";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "password";
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formStatus === "register") {
        const { name, confirmPassword, password } = formData;
        for (let i = 0; i < name.trim().length; i++) {
          if (!isNaN(name[i])) {
            return setErrors({ ...errors, name: true });
          }
        }
        if (confirmPassword !== password) {
          return setErrors({ ...errors, matchError: true });
        }
        if (confirmPassword.length < 6 || password.length < 6) {
          return setErrors({ ...errors, lengthError: true });
        }
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        };
        setLoading(true);

        const response = await register(payload);
        if (response && response.status === 200) {
          setLoading(false);
          return alert("Account Created!");
        }
      } else {
        const { email, password } = formData;
        const payload = {
          email: email.trim(),
          password,
        };
        setLoading(true);
        const response = await login(payload);
        if (response && response.status === 200) {
          setLoading(false);
          localStorage.setItem("jwToken", response.data.jwToken);
          return navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.status === 409) {
        return alert(err.message);
      } else if (err.status === 404) {
        return alert(err.message);
      } else if (err.status === 401) {
        return alert(err.message);
      } else {
        return alert(err.message);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <div className={styles.formTitle}>{getFromTitle()}</div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {formStatus === "register" ? (
              <>
                {" "}
                <div className={styles.feild}>
                  <div className={styles.leftIcon}>
                    <img src={profile} alt="profile" />
                  </div>
                  <div className={styles.inputCont}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="name"
                      required={isRequired()}
                      placeholder="Name"
                    />
                  </div>
                </div>
                {errors.name ? <label>Invalid name</label> : ""}
              </>
            ) : (
              ""
            )}
            <div className={styles.feild}>
              <div className={styles.leftIcon}>
                <img src={emailIcon} alt="email" />
              </div>
              <div className={styles.inputCont}>
                <input
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                />
              </div>
            </div>

            {formStatus === "register" ? (
              <>
                <div className={`${styles.feild} ${styles.passwords}`}>
                  <div className={styles.leftIcon}>
                    <img src={lock} alt="confirm password" />
                  </div>
                  <div className={styles.inputCont}>
                    <input
                      onChange={(e) => handleChange(e)}
                      ref={confirmRef}
                      name="confirmPassword"
                      required={isRequired()}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div onClick={handleConfirmRef} className={styles.rightIcon}>
                    <img src={eye} alt="show password" />
                  </div>
                </div>
                {errors.lengthError ? (
                  <label>password should be atleast 6 characters</label>
                ) : (
                  ""
                )}
                {errors.matchError ? (
                  <label>passwords doesn't match</label>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            <div className={`${styles.feild} ${styles.passwords}`}>
              <div className={styles.leftIcon}>
                <img src={lock} alt="password" />
              </div>
              <div className={styles.inputCont}>
                <input
                  onChange={(e) => handleChange(e)}
                  ref={passwordRef}
                  name="password"
                  required
                  placeholder="Password"
                />
              </div>
              <div onClick={handlePasswordRef} className={styles.rightIcon}>
                <img src={eye} alt="show password" />
              </div>
            </div>
            {errors.lengthError ? (
              <label>password should be atleast 6 characters</label>
            ) : (
              ""
            )}
            {errors.matchError ? <label>passwords doesn't match</label> : ""}
            <div className={styles.btnContainer}>
              <button type="sumbit">{getButtonName()}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
