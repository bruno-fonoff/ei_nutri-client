import { Link } from "react-router-dom";
import home from "../../assets/images/home.png";

export function Footer() {
  return (
    <div className="pt-5 pb-2">
      <Link to="/" className="flex justify-center">
        <img src={home} alt="home button" className="h-14 0 rounded-full " />
      </Link>
    </div>
  );
}
