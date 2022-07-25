import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import moment from "moment";
import Calendar from "../../components/Calendar/index.js";

export function AdminProfile() {
  const [value, setValue] = useState(moment());
  // const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await api.get("/user/profile");
  //     setUser(response.data);
  //   }

  //   fetchUser();
  // }, []);

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      <h1>{loggedInUser.user.name}</h1>
      <p>{loggedInUser.user.email}</p>
      <button onClick={handleLogOut}>Sair</button>
      <div>
        <Calendar value={value} onChange={setValue} />
      </div>
    </>
  );
}
