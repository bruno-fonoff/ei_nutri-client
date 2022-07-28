import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import toast, { Toaster } from "react-hot-toast";

export function PatientProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
<<<<<<< HEAD
      const response = await api.get("/user/profile");
      setUser(response.data);
      console.log(response.data);
=======
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
>>>>>>> 1757e8b8009e5bd924fbd12565b9c8903c66f6ed
    }
    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  function handleEdit() {
    navigate("/user/update-profile");
  }

  function handleCatalog() {
    navigate("/user/catalog");
  }

  async function handleDelete() {
    try {
      await api.delete("/user/disable-profile");
      toast.success("Conta deletada com sucesso!");
    } catch (error) {}
    navigate("/");
  }

<<<<<<< HEAD
  console.log(loggedInUser.user);
  console.log(loggedInUser.user.appointments);
  console.log(loggedInUser.user);
=======
  console.log(user);
>>>>>>> 1757e8b8009e5bd924fbd12565b9c8903c66f6ed

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div className="flex justify-center pt-12 pb-12">
        <div>
          <Toaster />
        </div>
        <img src={logo} alt="ei nutri logo" className="h-12 rounded-full" />
      </div>
      <div className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-4">
          <img
            src={user.user.img}
            alt="user profile"
            className="h-20 w-20 rounded-full"
          />
          <h1 className="block text-lg font-bold mb-2 pl-4 pt-6 mr-10">
            Bem vindo, {user.user.name} !
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
          <button
            className="shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mb-4 rounded-full w-full"
            onClick={handleDelete}
          >
            Deletar conta
          </button>
        </div>
        <div>
          <button
            className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full"
            onClick={handleCatalog}
          >
            Buscar nutricionista
          </button>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Suas consultas:</h2>
          </div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Seus reviews:</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
