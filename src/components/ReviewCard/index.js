import toast from "react-hot-toast";
import { api } from "../../api/api";

export function ReviewCard({ props }) {
  async function handleDeleteReview() {
    try {
      await api.delete(`/review/delete/${props._id}`);
      toast.success("Comentário deletado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="mb-1">
        <p>{props.description}</p>
        <p>{props.rating}</p>
      </div>
      <div>
        <button
          className="text-xs mb-4  focus:ring-4 bg-red-700 ring-inset shadow hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-40"
          onClick={handleDeleteReview}
        >
          Deletar Avaliação
        </button>
      </div>
    </div>
  );
}
