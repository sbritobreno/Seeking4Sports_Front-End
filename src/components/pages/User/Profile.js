import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import formStyles from "../../form/Form.module.css";
import Input from "../../form/Input";
import { username } from "../../objs";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(username);
  }, []);

  function onFileChange(e) {
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
        <img
          src={user.image}
          alt={"Profile img"}
        />
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Type your email"
          handleOnChange={handleChange}
          value={user.email || ""}
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
        <input type="submit" value="Edit" />
      </form>
    </section>
  );
}

export default Profile;
