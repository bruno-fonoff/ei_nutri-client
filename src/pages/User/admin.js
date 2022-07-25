import { Link } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";

export function NutriUser() {
  return (
    <div className="bg-amber-600 text-white h-screen">
      <div className="flex justify-center pt-52">
        <img src={logo} alt="ei nutri logo" className="h-24 rounded-full" />
      </div>
      <div>
        <h3 className="text-2xl mt-12 text-center">Tela do nutricionista</h3>
      </div>
      <div className="flex-col text-center text-black mt-8 justify-center">
        <div>
          <Link to="/admin/signup">
            <button className="items-center justify-center px-9 py-2 border border-transparent text-base font-medium mb-2 rounded-full  bg-indigo-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">
              Cadastrar
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/login">
            <button className="items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full  bg-indigo-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
