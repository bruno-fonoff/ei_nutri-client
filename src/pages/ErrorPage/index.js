import errorImg from "../../assets/images/errorpage.jpg";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import returnBtn from "../../assets/images/voltar.png";
import home from "../../assets/images/home.png";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <>
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/">
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
      <div className="border-solid border-8 border-black">
        {" "}
        <div className="border-solid border-8 border-amber-600">
          <img
            className="h-full w-full border-solid border-8 border-black"
            src={errorImg}
            alt="Error"
          />
        </div>
      </div>
      ;
    </>
  );
}
