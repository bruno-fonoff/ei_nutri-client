import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import { ReviewCard } from "../../components/ReviewCard";
import returnBtn from "../../assets/images/voltar.png";
import home from "../../assets/images/home.png";

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
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className=" h-screen w-full">
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/user/login">
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
      <div className="rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-4">
          <img
            src={user.user.img}
            alt="user profile"
            className="sm:h-20 md:h-36 lg:h-36 rounded-full"
          />
          <h1 className="block sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 pl-4 sm:pt-6 md:pt-14 lg:pt-14 mr-10">
            Bem vindo, <b>{user.user.name}</b> !
          </h1>
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
            <p>{user.user.appointments[0]}</p>
          </div>
          <div className="block text-lg font-bold mt-6 mb-2 pl-4">
            <h2>Suas avaliações:</h2>
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
