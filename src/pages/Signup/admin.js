import { useState, useRef } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";
import home from "../../assets/images/home.png";

export function NutriSignup() {
  const { register, setValue, getValues, setFocus } = useForm();
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
    zipcode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    uf: "",
  });

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("street", data.logradouro);
        // setAddress(address.street, data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("number");
        const values = getValues();
        console.log(values);
        setAddress({
          ...address,
          street: values.street,
          neighborhood: values.neighborhood,
          city: values.city,
          uf: values.uf,
          zipcode: cep,
        });
      });
  };
  console.log(address);
  function handleAddress(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
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
  const inputRef = useRef(null);

  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
    }
  };

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
    <div className=" h-full w-full">
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/admin">
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

      <div className="flex justify-center pt-8 pb-4">
        <img
          src={logo}
          alt="ei nutri logo"
          className="sm:h-24 md:h-40 lg:h-56 rounded-full"
        />
      </div>

      <form className="rounded px-8 pb-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="formName">
            Nome Completo:
          </label>
          <input
            className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none   border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-sm font-bold mb-2" htmlFor="formImg">
            Sua Foto de Perfil:
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
        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="formEmail">
            E-mail:
          </label>
          <input
            className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div>
          <div className="flex mb-4 justify-between">
            <div className="w-1/3 mr-4  ">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formPhone"
              >
                Telefone:
              </label>
              <input
                className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

            <div className="w-1/3">
              <label className="block text-sm font-bold mb-2" htmlFor="formCrn">
                CRN:
              </label>
              <input
                className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="formcrn"
                name="crn"
                placeholder="Ex :   9999"
                required={true}
                type="text"
                value={form.crn}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label className="block text-md font-bold mb-2" htmlFor="formAddress">
            Endereço do Consultório:
          </label>
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="address.zipcode"
          >
            CEP:
          </label>
          <input
            {...register("cep")}
            onBlur={checkCEP}
            className="focus:ring-4 ring-purple-700 ring-inset w-1/2 mb-4 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-sm font-bold mb-2"
            htmlFor="address.street"
          >
            Rua:
          </label>
          <input
            {...register("street")}
            className="focus:ring-4 ring-purple-700 ring-inset mb-4 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.street"
            name="street"
            placeholder="Ex :  99999-999"
            required={true}
            type="text"
            value={address.street}
            onChange={handleAddress}
          />

          <label
            className="block text-sm font-bold mb-2"
            htmlFor="address.street"
          >
            Bairro:
          </label>
          <input
            {...register("neighborhood")}
            className="focus:ring-4 ring-purple-700 ring-inset mb-4 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.neighborhood"
            name="neighborhood"
            placeholder="Ex :  Bairro dos Jardins"
            required={true}
            type="text"
            value={address.neighborhood}
            onChange={handleAddress}
          />

          <label
            className="block text-sm font-bold mb-2"
            htmlFor="address.city"
          >
            Cidade:
          </label>
          <input
            {...register("city")}
            className="focus:ring-4 ring-purple-700 ring-inset mb-4 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address.city"
            name="city"
            placeholder="Ex :  Santos"
            required={true}
            type="text"
            value={address.city}
            onChange={handleAddress}
          />
          <div className="flex mb-4 justify-between">
            <div className="w-3/8 mr-4">
              <label className="block text-sm font-bold mb-2" htmlFor="number">
                Número:
              </label>
              <input
                {...register("number")}
                className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                name="number"
                placeholder="Ex :  9999"
                required={true}
                type="text"
                value={address.number}
                onChange={handleAddress}
              />
            </div>
            <div className="w-3/8 mr-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="address.uf"
              >
                UF:
              </label>
              <input
                {...register("uf")}
                className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address.uf"
                name="uf"
                placeholder="Ex :  BA"
                required={true}
                type="text"
                value={address.uf}
                onChange={handleAddress}
              />
            </div>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="formPassword"
          >
            Senha:
          </label>
          <input
            className="mb-4 focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formPassword"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            ref={inputRef}
          />
          <label className="mr-2">Mostrar Senha</label>
          <input
            className="accent-purple-700"
            type="checkbox"
            onClick={toggleShow}
          />
        </div>

        {/* --------------------------------------------------------------------------------- */}
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="formConfirmPassword"
          >
            Confirmação de Senha:
          </label>
          <input
            className="focus:ring-4 ring-purple-700 ring-inset shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="focus:ring-4 ring-purple-700 ring-inset shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Criar cadastro
          </button>
        </div>
      </form>
    </div>
  );
}
