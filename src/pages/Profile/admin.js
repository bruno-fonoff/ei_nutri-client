import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import toast, { Toaster } from "react-hot-toast";

export function NutriProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/admin/profile");
      setUser(response.data);
    }
    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  function handleEdit() {
    navigate("/admin/update-profile");
  }

  async function handleDelete() {
    try {
      await api.delete("/user/disable-profile");
      toast.success("Conta deletada com sucesso!");
    } catch (error) {}
    navigate("/");
  }
  let patients = [loggedInUser.user.patients];
  let appointments = [loggedInUser.user.appointments];

  console.log(appointments);
  console.log(patients);
  console.log(user);

  return (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div className="flex justify-start pt-12 pb-12 ml-10">
        <div>
          <Toaster />
        </div>
        <img src={logo} alt="ei nutri logo" className="h-24 rounded-full" />
      </div>
      <div className=" rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-4">
          <img
            src={loggedInUser.user.img}
            alt="user profile"
            className="h-16 rounded-lg"
          />
          <h1 className="block text-lg font-bold mb-2 pl-4 mr-24">
            Bem vindo, {loggedInUser.user.name} !
          </h1>
        </div>
        <div className="mb-8 flex justify-evenly">
          <button
            className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded-full"
            onClick={handleEdit}
          >
            Editar perfil
          </button>
          <button
            className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-12 rounded-full"
            onClick={handleLogOut}
          >
            Sair
          </button>
        </div>

        <div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Consultas:</h2>
            <div>
              {appointments.map((e) => {
                <p>{e}</p>;
                console.log(e);
              })}
            </div>
          </div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Avaliações:</h2>
          </div>
          <div className="flex justify-center">
            <button
              className="shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mb-4 rounded-full w-40"
              onClick={handleDelete}
            >
              Deletar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
