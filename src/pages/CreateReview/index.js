import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link, useParams, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/ei_nutri_logo.jpg";
// import Calendar from "../../components/Calendar";
// import moment from "moment";
// import returnBtn from "../../assets/images/voltar.png";
// import toast, { Toaster } from "react-hot-toast";

export function CreateReview() {
  const { userId, adminId } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const [review, setReview] = useState({
    owner: "",
    title: "",
    description: "",
    rating: "",
  });

  function handleChange(e) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.patch(
        `/review-added/${loggedInUser}/${adminId}`,

        { ...review }
      );
      console.log(response.data);

      navigate("/user/nutri-profile/review/:adminId");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <h1>Hello!</h1>
        <form className="rounded px-8 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="reviewOwner"
            >
              Nome:
            </label>
            <input
              className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none   border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reviewOwner"
              name="owner"
              placeholder="Ex :  Maria Joaquina da Silva"
              required={true}
              type="text"
              value={review.owner}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="reviewTitle"
            >
              Assunto:
            </label>
            <input
              className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none   border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reviewTitle"
              name="title"
              placeholder="Diga o Assunto do Comentário"
              required={true}
              type="text"
              value={review.title}
              onChange={handleChange}
            />
          </div>
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
      </div>
    </>
  );
}
