import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";

export function PatientLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/user/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div className="flex justify-center pt-12 pb-12">
        <img src={logo} alt="ei nutri logo" className="h-12 rounded-full" />
      </div>
      <div>
        <Link to="/user">
          <img
            src={returnBtn}
            alt="retornar pagina"
            className="h-8 rounded-full ml-8"
          />
        </Link>
        <form className="rounded px-8 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email:</label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Senha:</label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full mt-2"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
