import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import toast, { Toaster } from "react-hot-toast";
import { ReviewCard } from "../../components/ReviewCard";

export function PatientProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [handlerefresh]);

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

  function handlerefresh() {
    navigate("/user/profile");
  }

  async function handleDelete() {
    try {
      await api.delete("/user/disable-profile");
      toast.success("Conta deletada com sucesso!");
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div className="flex justify-center pt-12 pb-12">
        <div>
          <Toaster />
        </div>
        <img
          src={logo}
          alt="ei nutri logo"
          className="sm:h-24 md:h-40 lg:h-56 rounded-full"
        />
      </div>
      <div className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-4">
          <img
            src={user.user.img}
            alt="user profile"
            className="sm:h-20 md:h-36 lg:h-36 rounded-full"
          />
          <h1 className="block sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 pl-4 sm:pt-6 md:pt-14 lg:pt-14 mr-10">
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
        <div className="flex justify-center">
          <button
            className="shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mb-4 rounded-full w-40"
            onClick={handleDelete}
          >
            Deletar conta
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-50"
            onClick={handleCatalog}
          >
            Buscar nutricionista
          </button>
        </div>
        <div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Suas consultas:</h2>
            <p>{user.user.appointments[0].slice(0, 21)} hrs.</p>
          </div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Seus reviews:</h2>
            {user.user.reviews.map((currentReview) => {
              return (
                <div onClick={handlerefresh} key={currentReview._id}>
                  <ReviewCard props={currentReview} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
