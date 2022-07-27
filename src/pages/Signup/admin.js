import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function NutriSignup() {
  const { register, setValue, setFocus } = useForm();

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        const response = data;
        console.log(response);

        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("number");
        console.log(data.logradouro);
      });
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    crn: "",
    password: "",
    confirmPassword: "",
    address: {},
  });

  const [img, setImg] = useState("");
  const [address, setAddress] = useState({
    street: "",
    addressNumber: "",
    neighborhood: "",
    city: "",
    zipcode: "",
    uf: "",
  });

  function handleAddress(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }
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
      const response = await api.post("admin/signup", {
        ...form,
        address: address,
        img: imgURL,
      });
      console.log(response.data);

      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formName"
          >
            Nome Completo:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formName"
            name="name"
            placeholder="Ex :  Maria Joaquina da Silva"
            required={true}
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formEmail"
          >
            E-mail:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formEmail"
            name="email"
            placeholder="Ex :  anonimo@gmail.com"
            required={true}
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formPhone"
          >
            Telefone de Contato:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formPhone"
            name="phone"
            placeholder="Ex :  13 99999-9999"
            required={true}
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formCrn"
          >
            CRN:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formcrn"
            name="crn"
            placeholder="Ex :   9999"
            required={true}
            type="text"
            value={form.crn}
            onChange={handleChange}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formAddress"
          >
            Endereço do Consultório:
          </label>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address.zipcode"
          >
            CEP:
          </label>
          <input
            {...register("cep")}
            onBlur={checkCEP}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.zipcode"
            name="zipcode"
            placeholder="Ex :  99999-999"
            required={true}
            type="text"
            value={address.zipcode}
            onChange={handleAddress}
          />

          {/* --------------------------------------------------------------------------------- */}

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address.street"
          >
            Rua:
          </label>
          <input
            {...register("street")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.street"
            name="street"
            placeholder="Ex :  99999-999"
            required={true}
            type="text"
            value={address.street}
            onChange={handleAddress}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="number"
          >
            Número:
          </label>
          <input
            {...register("number")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            name="number"
            placeholder="Ex :  9999"
            required={true}
            type="text"
            value={address.number}
            onChange={handleAddress}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address.street"
          >
            Bairro:
          </label>
          <input
            {...register("neighborhood")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.neighborhood"
            name="neighborhood"
            placeholder="Ex :  Bairro dos Jardins"
            required={true}
            type="text"
            value={address.neighborhood}
            onChange={handleAddress}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address.city"
          >
            Cidade:
          </label>
          <input
            {...register("city")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.city"
            name="city"
            placeholder="Ex :  Santos"
            required={true}
            type="text"
            value={address.city}
            onChange={handleAddress}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address.uf"
          >
            UF:
          </label>
          <input
            {...register("uf")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.uf"
            name="uf"
            placeholder="Ex :  BA"
            required={true}
            type="text"
            value={address.uf}
            onChange={handleAddress}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formImg"
          >
            Sua Foto de Perfil:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            id="formImg"
            onChange={handleImage}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formPassword"
          >
            Senha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formPassword"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="formConfirmPassword"
          >
            Confirmação de Senha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formConfirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div>
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
