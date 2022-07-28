import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import Calendar from "../../components/Calendar";
import moment from "moment";
import returnBtn from "../../assets/images/voltar.png";
import toast, { Toaster } from "react-hot-toast";
// import "moment/locale/pt-br";
// import "../../components/Calendar/styles.css";

export function GoToNutriProfile() {
  const [value, setValue] = useState(moment());
  const { loggedInUser } = useContext(AuthContext);
  const { adminId } = useParams();
  const [nutri, setNutri] = useState();
  const [loading, setLoading] = useState(true);
  const [dateHour, setDateHour] = useState("");
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    whyAreYouHere: "",
  });

  useEffect(() => {
    async function fetchNutriProfile() {
      try {
        const consulta = dateHour.toString();
        const response = await api.get(`/user/nutri-profile/${adminId}`);
        setNutri(response.data.nutri[0]);
        // precisa comentar a linha abaixo
        setNutri({ ...nutri, appointments: consulta });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNutriProfile();
  }, [adminId]);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const consulta = dateHour.toString();
        const response = await api.get("/user/profile");
        setUserForm(response.data.user);
        // precisa comentar a linha abaixo
        setUserForm({ ...userForm, appointments: consulta });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, []);

  // nutri.appointments = dateHour.toString();
  console.log(userForm);
  console.log(nutri);

  async function handleAppointment(e) {
    e.preventDefault();
    try {
      await api.patch(`/user/nutri-added/${loggedInUser.user._id}/${adminId}`);
      await api.patch(
        `/user/appointment-created/${loggedInUser.user._id}/${adminId}`
      );

      const clone = { ...userForm };
      delete clone._id;
      await api.patch("/user/update-profile", clone);

      const clone2 = { ...nutri };
      delete nutri._id;
      await api.patch("/admin/update-profile", clone2);

      toast.success("Consulta agendada!");
    } catch (error) {
      console.log(error);
    }
  }

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className="bg-amber-600 text-white h-screen w-full">
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center pt-12">
        <img src={logo} alt="ei nutri logo" className="h-12 rounded-full" />
      </div>
      <Link to="/user/catalog">
        <img
          src={returnBtn}
          alt="retornar pagina"
          className="h-8 rounded-full ml-8"
        />
      </Link>
      <div className="flex justify-center px-5 pb-4 mt-4">
        <img
          src={nutri.img}
          alt="user profile"
          className="h-24 w-24 rounded-full"
        />
      </div>
      <div className="flex justify-center font-bold text-xl mb-2">
        <p>{nutri.name}</p>
      </div>
      <div>
        {
          <Calendar
            value={value}
            onChange={setValue}
            setDateHour={setDateHour}
          />
        }
      </div>
      <div>
        <button
          className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-full mt-2"
          type="submit"
          onClick={handleAppointment}
        >
          Agendar consulta
        </button>
      </div>
    </div>
  );
}
