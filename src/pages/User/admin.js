import { Link } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";

export function NutriUser() {
  return (
    <div className="bg-amber-600 text-white h-screen">
      <div className="flex justify-center pt-52">
        <img src={logo} alt="ei nutri logo" className="h-24 md:48 lg:h-56 rounded-full" />
      </div>
      <div>
        <h3 
        className="font-bold mb-2 text-2xl mt-12 text-center">O que você quer fazer?</h3>
      </div>
      <div className="flex-col text-center text-black mt-8 justify-center">
        <div>
          <Link to="/admin/signup">
            <button className="
            items-center justify-center px-9 py-2 border border-transparent text-base mb-2 rounded-full  bg-purple-700 hover:bg-purple-400 transition ease-in-out delay-150 text-white font-bold hover:-translate-x-1 hover:scale-110  duration-300">
              Cadastrar
            </button>
          </Link>
        </div>
        <div>
          <Link to="/admin/login">
            <button className="
            items-center justify-center px-12 py-2 border border-transparent text-base mb-2 rounded-full  bg-purple-700 hover:bg-purple-400 transition ease-in-out delay-150 text-white font-bold hover:-translate-x-1 hover:scale-110  duration-300">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
