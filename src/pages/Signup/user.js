import { useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";

export function PatientSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
<<<<<<< HEAD
    whyAreYouHere: [
      "Health",
      "Weight Management",
      "Food allergy",
      "Digestive Issues",
      "Meal Planning",
      "Abnormal Lab Values",
      "Other",
    ],
=======
    whyAreYouHere: "",
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
    password: "",
    confirmPassword: "",
  });

  const [img, setImg] = useState("");

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
      const imgURL = await handleUpload();
      const response = await api.post("/user/signup", { ...form, img: imgURL });
      console.log(response);

      navigate("/user/login");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);

  return (
    <div className="bg-amber-600 text-white h-screen w-full">
<<<<<<< HEAD
      <div className="flex justify-center pt-12 pb-12">
=======
      <div className="flex justify-center pt-12">
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
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

        <form
          className="shadow-md rounded px-8 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formName">
              Nome:
            </label>
            <input
<<<<<<< HEAD
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
              id="formName"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formImg">
              Sua foto de perfil:
            </label>
            <input
<<<<<<< HEAD
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
=======
              className="shadow appearance-none border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
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
<<<<<<< HEAD
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="formObj"
                type="text"
                value={form.whyAreYouHere}
                onChange={handleChange}
              >
                <option value="Health">Health</option>
                <option value="Weight">Weight Management</option>
                <option value="Food allergy">Food allergy</option>
                <option value="Digestive Issues">Digestive Issues</option>
                <option value="Meal Planning">Meal Planning</option>
                <option value="Abnormal Lab Values">Abnormal Lab Values</option>
                <option value="Other">Other</option>
=======
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
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
<<<<<<< HEAD
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
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
<<<<<<< HEAD
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
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
<<<<<<< HEAD
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
                id="formHeight"
                name="height"
                type="height"
                value={form.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="formEmail">
              E-mail:
            </label>
            <input
<<<<<<< HEAD
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
              id="formEmail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="formPassword"
            >
              Senha:
            </label>
            <input
<<<<<<< HEAD
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
              id="formPassword"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="formConfirmPassword"
            >
              Confirmação de senha:
            </label>
            <input
<<<<<<< HEAD
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
=======
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
>>>>>>> 99d4568a242c332970839bef4ade0c2eca575edc
              id="formConfirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full mt-2"
              type="submit"
            >
              Criar cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
