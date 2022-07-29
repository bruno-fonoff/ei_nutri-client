import { Link } from "react-router-dom";
import home from "../../assets/images/home.png";
import returnBtn from "../../assets/images/voltar.png";

export function NavBar() {
  return (
    <>
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
    </>
  );
}
