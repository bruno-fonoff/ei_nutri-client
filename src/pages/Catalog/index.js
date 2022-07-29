import { useState, useEffect } from "react";
import { api } from "../../api/api";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import { Link } from "react-router-dom";
import { CatalogCard } from "../../components/CatalogCard";
import returnBtn from "../../assets/images/voltar.png";
import home from "../../assets/images/home.png";

export function Catalog() {
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const response = await api.get("/user/catalog");
        setForm(response.data.allNutris);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCatalog();
  }, []);

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className="w-full">
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/user/profile">
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
      <div>
        <div className="mb-4">
          <h1 className="block sm:text-lg md:text-xl lg:text-2xl font-bold mb-10 text-center w-full">
            Nosso catálogo de nutricionistas!
          </h1>
        </div>
      </div>
      {form.map((currentNutri) => {
        return (
          <div key={currentNutri._id}>
            <CatalogCard currentNutri={currentNutri}></CatalogCard>
          </div>
        );
      })}
    </div>
  );
}
