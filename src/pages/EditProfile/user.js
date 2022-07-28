import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";
import toast, { Toaster } from "react-hot-toast";

export function EditPatientProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    whyAreYouHere: "",
  });

  const [img, setImg] = useState("");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await api.get("/user/profile");
        setForm(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const clone = { ...form };
      delete clone._id;
      const imgURL = await handleUpload();
      const response = await api.patch("/user/update-profile", {
        ...form,
        img: imgURL,
      });
      console.log(response);
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
      toast.error("Campo vazio ou incompleto!");
    }
  }

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div className="flex justify-center pt-12">
        <img src={logo} alt="ei nutri logo" className="h-12 rounded-full" />
      </div>
      <div>
        <Toaster />
      </div>
      <div>
        <Link to="/user/profile">
          <img
            src={returnBtn}
            alt="retornar pagina"
            className="h-8 rounded-full ml-8"
          />
        </Link>
        <form className="rounded px-8 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formName">
              Nome:
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
              id="formName"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formEmail">
              E-mail:
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
              id="formEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formImg">
              Sua foto de perfil:
            </label>
            <input
              className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 focus:ring-4 ring-purple-700 ring-inset  appearance-none  rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              id="formImg"
              onChange={handleImage}
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="formObj">
              Qual seu objetivo?
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-4 ring-purple-700 ring-inset"
                id="formObj"
                type="text"
                name="whyAreYouHere"
                value={form.whyAreYouHere}
                onChange={handleChange}
              >
                <option value="Saúde">Saúde</option>
                <option value="Controle de peso">Controle de peso</option>
                <option value="Alergia alimentar">Alergia alimentar</option>
                <option value="Problemas digestivos e/ou intestinais">
                  Problemas digestivos e/ou intestinais
                </option>
                <option value="Exame laboratorial alterado">
                  Exame laboratorial alterado
                </option>
                <option value="Outro">Outro</option>
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
          </div>
          <div className="flex mb-4 justify-between">
            <div className="w-1/4">
              <label className="block text-sm font-bold mb-2" htmlFor="formAge">
                Idade:
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
                id="formAge"
                name="age"
                type="age"
                value={form.age}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formWeight"
              >
                Peso:
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
                id="formWeight"
                name="weight"
                type="weight"
                value={form.weight}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formHeight"
              >
                Altura:
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-4 ring-purple-700 ring-inset"
                id="formHeight"
                name="height"
                type="height"
                value={form.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full mt-2"
              type="submit"
            >
              Atualizar cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
