import { Link } from "react-router-dom";
import home from "../../assets/images/home.png";

export function Footer() {
  return (
    <div className="bg-purple-700 p-2">
      <Link to="/" className="flex justify-center">
        <img
          src={home}
          alt="home button"
          className="h-14 bg-amber-600 rounded-full "
        />
      </Link>
    </div>
  );
}
