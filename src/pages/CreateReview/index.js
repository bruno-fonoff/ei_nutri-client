import { AuthContext } from "../../contexts/authContext";
import { useContext, useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";
import toast, { Toaster } from "react-hot-toast";
import { ReviewCard } from "../../components/ReviewCard";

export function CreateReview() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const [infoReview, setInfoReview] = useState([]);
  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: "",
  });

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const response = await api.get(`/user/nutri-profile/${adminId}`);
        setInfoReview(response.data.nutri[0].reviews);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCatalog();
  }, [adminId]);
  // console.log(infoReview);
  function handleChange(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.patch(
        `/review/review-added/${loggedInUser.user._id}/${adminId}`,
        review
      );
      toast.success("Comentário criado com sucesso!");
      navigate("#");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(loggedInUser);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center pt-12">
        <img
          src={logo}
          alt="ei nutri logo"
          className="sm:h-24 md:h-40 lg:h-56 rounded-full"
        />
      </div>
      <Link to="/user/catalog">
        <img
          src={returnBtn}
          alt="retornar pagina"
          className="h-12 rounded-full ml-8 mb-4"
        />
      </Link>
      <form className="rounded px-8 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="reviewDescription"
          >
            Comentário:
          </label>
          <textarea
            className="h-24 focus:ring-4 ring-purple-700 ring-inset shadow appearance-none   border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reviewDescription"
            name="description"
            placeholder="Max : 144 caracteres"
            required={true}
            type="text"
            value={review.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="formObj">
            Deixe Sua Avaliação
          </label>
          <div className="relative">
            <select
              className="text-purple-700 text-2xl block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-4 ring-purple-700 ring-inset"
              id="formObj"
              type="text"
              name="rating"
              value={review.rating}
              onChange={handleChange}
            >
              <option value="★☆☆☆☆">★☆☆☆☆</option>
              <option value="★★☆☆☆">★★☆☆☆</option>
              <option value="★★★☆☆">★★★☆☆</option>
              <option value="★★★★☆">★★★★☆</option>
              <option value="★★★★★">★★★★★</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div>
            <button
              className="mt-4 focus:ring-4 ring-purple-700 ring-inset shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full"
              type="submit"
            >
              Criar Avaliação
            </button>
          </div>
        </div>
      </form>
      <div className="block text-lg font-bold mt-6 mb-2 pl-4">
        <h2>Avaliações:</h2>
        {infoReview.map((currentReview) => {
          return (
            <div key={currentReview._id}>
              <ReviewCard props={currentReview} />
            </div>
          );
        })}
      </div>
    </>
  );
}
