import { useNavigate } from "react-router-dom";

export function CatalogCard({ currentNutri }) {
  const navigate = useNavigate();

  function GoToNutriProfile() {
    navigate(`/user/nutri-profile/${currentNutri._id}`);
  }

  return (
    <div className="rounded px-8 pb-8">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          src={currentNutri.img}
          alt="user profile"
          className="h-12 w-12 ml-32 rounded-full"
        />
        <div className="px-6">
          <div className="font-bold text-xl mb-2">
            <p>Nome: {currentNutri.name}</p>
            <p>CRN: {currentNutri.crn}</p>
          </div>
          <p className="text-base font-bold">Endereço do consultório:</p>
          <p>
            Rua: {currentNutri.address.street}, n°:{" "}
            {currentNutri.address.number}. <br /> Bairro:{" "}
            {currentNutri.address.neighborhood}. CEP:{" "}
            {currentNutri.address.zipcode}.<br />
            Cidade: {currentNutri.address.city},{" "}
            {currentNutri.address.uf.toUpperCase()}
          </p>
          <p>Telefone para contato: {currentNutri.phone}</p>
        </div>
        <div className="pt-4 pb-2">
          <div>
            <button
              className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full"
              onClick={GoToNutriProfile}
            >
              Agendar consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
