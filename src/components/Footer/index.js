import { Link } from "react-router-dom";
import home from "../../assets/images/home.png";

export function Footer() {
  return (
    <Link to="/" className="flex justify-center">
      <img src={home} alt="home button" className="h-14 rounded-full -mt-16" />
    </Link>
  );
}
