import { useState, useContext } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";
import styles from "../../form/Form.module.css";
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }
  
  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Type your email"
          handleOnChange={handleChange}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Login" />
      </form>
      <p>
        Do not have an account? <Link to="/register">Click here.</Link>
      </p>
      <p>
        Forgot your password? <Link to="/register">Click here.</Link>
      </p>
    </section>
  );
}

export default Login;
