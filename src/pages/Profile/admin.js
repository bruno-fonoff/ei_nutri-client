import { useEffect, useState, useContext } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import toast, { Toaster } from "react-hot-toast";
import returnBtn from "../../assets/images/voltar.png";
import home from "../../assets/images/home.png";
import { ReviewCard } from "../../components/ReviewCard";

export function NutriProfile() {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/admin/profile");
      setAdmin(response.data);
      setLoading(false);
      console.log(response.data.admin.reviews[0]);
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
      await api.delete("/admin/disable-profile");
      toast.success("Conta deletada com sucesso!");
    } catch (error) {}
    navigate("/");
  }

  console.log(admin);

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className=" h-screen w-full">
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/admin/login">
          <img
            src={returnBtn}
            alt="retornar pagina"
            className="h-10 rounded-full ml-8"
          />
        </Link>
        <Link to="/" className="flex justify-center">
          <img
            src={home}
            alt="home button"
            className="h-10 0 rounded-full mr-8"
          />
        </Link>
      </div>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <img
            src={logo}
            alt="ei nutri logo"
            className="sm:h-24 md:h-40 lg:h-56 rounded-full mt-4 ml-8"
          />
        </div>

        <div className="">
          <div>
            <button
              className="mt-4 mb-2 shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold w-28 rounded-full"
              onClick={handleEdit}
            >
              Editar
            </button>
          </div>
          <div>
            <button
              className="mb-2 shadow bg-red-700 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold w-28 rounded-full "
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>
          <div>
            <button
              className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold w-28 mr-8 rounded-full"
              onClick={handleLogOut}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className=" rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-4">
          <img
            src={loggedInUser.user.img}
            alt="user profile"
            className="sm:h-20 md:h-36 lg:h-36 rounded-full"
          />
          <h1 className="block sm:text-lg md:text-xl lg:text-2xl  mb-2 pl-4 sm:pt-6 md:pt-14 lg:pt-14 mr-10">
            Bem vindo , <b>{loggedInUser.user.name} </b> !
          </h1>
        </div>

        <div>
          <div className="block text-lg  mt-6 mb-2 pl-4">
            <h2 className="font-bold">Consultas:</h2>
            <h3>{admin.admin.appointments[0].slice(0, 21)}</h3>
          </div>
          <div className="block text-lg mt-6 mb-2 pl-4">
            <h2 className="font-bold">Avaliações:</h2>
            <h3>
              {" "}
              {admin.admin.reviews.map((currentReview) => {
                return (
                  <div>
                    <ReviewCard props={currentReview} />
                  </div>
                );
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
