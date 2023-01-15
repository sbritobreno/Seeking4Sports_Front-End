import { useState, useEffect } from "react";
import api from "../../../utils/api";
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import useFlashMessage from "../../../hooks/useFlashMEssage";
import WarningMessage from "../Warning/WarningMessage";

function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  const [warningOpen, setWarningOpen] = useState(false);
  const [btnText, setBtnText] = useState("");
  const warningMessage = "Are you sure you want to delete your account ?";

  useEffect(() => {
    api
      .get("/user/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let msgType = "success";
    const formData = new FormData();

    await Object.keys(user).forEach((key) => formData.append(key, user[key]));

    const data = await api
      .patch(`/user/edit`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  function toggleWarningMessage(value) {
    setWarningOpen(value);
  }

  return (
    <section>
      {warningOpen ? (
        <WarningMessage
          toggleWarningMessage={toggleWarningMessage}
          btnText={btnText}
          warningMessage={warningMessage}
        />
      ) : (
        <></>
      )}
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        <div className={formStyles.preview_images}>
          {(user.image || preview) && (
            <img
              src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`}
              alt="Profile img"
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          value={user.email || ""}
          readOnly={"readonly"}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Type your name"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Username"
          type="text"
          name="username"
          value={user.username || ""}
          autoComplete={"username"}
          readOnly={"readonly"}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Type your phone number"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type your password again"
          autoComplete={"new-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" name="button_1" value="Edit" />
        <button
          className={styles.btn2}
          onClick={() => {
            setBtnText("Delete Account");
            toggleWarningMessage(true);
          }}
        >
          Delete Account
        </button>
      </form>
    </section>
  );
}

export default Profile;
