import { useState, useEffect } from "react";
import { api } from "../../api/api";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import { Link } from "react-router-dom";
import { CatalogCard } from "../../components/CatalogCard";
import returnBtn from "../../assets/images/voltar.png";

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
    <div className="bg-amber-600 text-white w-full">
      <div className="flex justify-center pt-12">
        <img src={logo} alt="ei nutri logo" className="h-12 rounded-full" />
      </div>
      <div>
        <Link to="/user/profile">
          <img
            src={returnBtn}
            alt="retornar pagina"
            className="h-8 rounded-full ml-8"
          />
        </Link>

        <div className="mb-4">
          <h1 className="block text-lg font-bold mb-2 text-center w-full">
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
