import React, { useState } from "react";
import styles from "./updateform.module.css";
import profile from "../../assets/Profile.svg";
import lock from "../../assets/lock.svg";
import eye from "../../assets/eye.svg";
import { updateUser } from "../../api/user";
import Loading from "../Loading/Loading";
function UpdateForm() {
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      let { name, oldPassword, newPassword } = formData;
      name = name.trim();
      if (name !== "") {
        for (let i = 0; i < name.length; i++) {
          if (!isNaN(name[i])) {
            return alert("Enter valid name");
          }
        }
      }
      if (name === "" && oldPassword === "" && newPassword === "") {
        return alert("Name or Password required");
      }
      if (oldPassword === "" && newPassword === "" && name !== "") {
        const payload = {
          name: name,
        };
        setLoading(true);
        await updateUser(payload);
        setLoading(false);
        return alert("User updated");
      } else if (name === "" && oldPassword !== "" && newPassword !== "") {
        if (newPassword.length < 6) {
          return alert("password length must be atleast 6");
        }
        const payload = {
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        setLoading(true);
        await updateUser(payload);
        setLoading(false);
        return alert("User updated");
      } else if (name !== "" && oldPassword !== "" && newPassword !== "") {
        if (newPassword.length < 6) {
          return alert("password length must be atleast 6");
        }
        const payload = {
          name: name,
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        setLoading(true);
        await updateUser(payload);
        setLoading(false);
        return alert("User updated");
      } else {
        return alert("both password feilds required");
      }
    } catch (err) {
      setLoading(false);
      if (err.status === 401) {
        return alert("Incorrect Passsowrd");
      } else {
        window.location.reload();
        return alert("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <form onSubmit={handleUpdate}>
          <div className={styles.feild}>
            <div className={styles.leftIcon}>
              <img src={profile} alt="profile" />
            </div>
            <div className={styles.inputCont}>
              <input
                value={formData.name}
                onChange={(e) => handleChange(e)}
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
          </div>
          <div className={`${styles.feild} ${styles.passwords}`}>
            <div className={styles.leftIcon}>
              <img src={lock} alt="confirm password" />
            </div>
            <div className={styles.inputCont}>
              <input
                value={formData.oldPassword}
                onChange={(e) => handleChange(e)}
                type={showPasswordOld ? "text" : "password"}
                name="oldPassword"
                placeholder="old Password"
              />
            </div>
            <div
              onClick={() => setShowPasswordOld(!showPasswordOld)}
              className={styles.rightIcon}
            >
              <img src={eye} alt="show password" />
            </div>
          </div>
          <div className={`${styles.feild} ${styles.passwords}`}>
            <div className={styles.leftIcon}>
              <img src={lock} alt="New password" />
            </div>
            <div className={styles.inputCont}>
              <input
                value={formData.newPassword}
                onChange={(e) => handleChange(e)}
                type={showPasswordNew ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
              />
            </div>
            <div
              onClick={() => setShowPasswordNew(!showPasswordNew)}
              className={styles.rightIcon}
            >
              <img src={eye} alt="show password" />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button type="sumbit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateForm;
