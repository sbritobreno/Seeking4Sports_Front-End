import api from "../../../utils/api";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context/UserContext";

function VerifyEmail() {
  const { email, username } = useParams();
  const { authUser } = useContext(Context);

  useEffect(() => {
    const data = api.post(`/user/email/confirm/${email}/${username}`).then((response) => {
      return response.data;
    });
    authUser(data);
  });

  return (
    <div>
      <h1>Confirming email...</h1>
    </div>
  );
}

export default VerifyEmail;
