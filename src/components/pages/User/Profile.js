import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import { username } from "../../objs";

function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setUser(username[0]);
  }, []);

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        <div className={formStyles.preview_images}>
        {(user.image || preview) && (
          <img
            src={preview ? URL.createObjectURL(preview) : user.image}
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
          readonly={"readonly"}
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
          readonly={"readonly"}
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
          handleOnChange={handleChange}
        />
        <Input
          text="Password Confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Type your password again"
          handleOnChange={handleChange}
        />
        <input type="submit" name="button_1" value="Edit" />
        <input className={formStyles.btn2} type="submit" name="button_2" value="Delete Account" />
      </form>
    </section>
  );
}

export default Profile;
