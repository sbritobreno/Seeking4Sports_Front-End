import api from "../../../utils/api";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context/UserContext";
import styles from "../../form/Form.module.css";
import Input from "../../form/Input";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMEssage";

function VerifyEmail() {
  const { email, username } = useParams();
  const { login } = useContext(Context);
  const [user, setUser] = useState({email: email});
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    let msgType = "success";
    let msgText = "Email is confirmed!";

    //confirm user email
    api
      .post(`/user/email/confirm/${email}/${username}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        msgText = err.response.data.message;
        return err.response.data;
      });
      
      setFlashMessage(msgText, msgType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  function handleChange(e) {
    setUser({ ...user, password: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}><Input
          text="E-mail"
          type="email"
          name="email"
          autoComplete={"email"}
          value={email}
          readOnly={"readonly"}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          autoComplete={"current-password"}
          handleOnChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    </section>
  );
}

export default VerifyEmail;
