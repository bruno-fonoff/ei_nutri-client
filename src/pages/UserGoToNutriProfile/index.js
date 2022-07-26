import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/ei_nutri_logo.jpg";
import Calendar from "../../components/Calendar";
import moment from "moment";
import returnBtn from "../../assets/images/voltar.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import home from "../../assets/images/home.png";

export function GoToNutriProfile() {
  const navigate = useNavigate();
  const [value, setValue] = useState(moment());
  const { loggedInUser } = useContext(AuthContext);
  const { adminId } = useParams();
  const [nutri, setNutri] = useState({
    name: "",
    email: "",
    phone: "",
    crn: "",
    password: "",
    confirmPassword: "",
    appointments: "",
    reviews: "",
    nutritionists: "",
    address: {},
  });
  const [loading, setLoading] = useState(true);
  const [dateHour, setDateHour] = useState("");
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    whyAreYouHere: "",
    appointments: "",
    patients: "",
    reviews: "",
  });
  const consulta = dateHour.toString();

  useEffect(() => {
    async function fetchNutriProfile() {
      try {
        const response = await api.get(`/user/nutri-profile/${adminId}`);
        setNutri({ ...response.data.nutri[0] });
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
        const response = await api.get("/user/profile");
        setUserForm({ ...response.data.user });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, []);

  async function handleAppointment(e) {
    try {
      await api.patch(`/user/nutri-added/${loggedInUser.user._id}/${adminId}`);
      toast.success("Consulta agendada!");
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDate(e) {
    try {
      await api.patch("/user/update-profile", {
        ...userForm,
        appointments: [consulta],
      });

      await api.patch(`/user/appointment-created/${adminId}`, {
        ...nutri,
        appointments: [consulta],
      });
    } catch (error) {
      console.log(error);
    }
  }

  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <div className=" h-screen w-full">
      <div className="pt-3 bg-amber-600 pb-3 flex justify-between items-center">
        <Link to="/user/catalog">
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
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center pt-8 pb-4">
        <img
          src={logo}
          alt="ei nutri logo"
          className="sm:h-24 md:h-40 lg:h-56 rounded-full"
        />
      </div>
      <div className="flex justify-center px-5 pb-4 mt-4">
        <img
          src={nutri.img}
          alt="user profile"
          className="h-24 w-24 rounded-full"
        />
      </div>
      <div className="flex justify-center font-bold sm:text-lg md:text-xl lg:text-2xl mb-2">
        <p>
          Nutricionista: <span className="ml-2">{nutri.name}</span>
        </p>
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
      <div className="flex justify-center">
        <button
          className="shadow bg-purple-700 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full w-50 mt-2"
          type="submit"
          onClick={() => {
            handleAppointment();
            handleDate();
          }}
        >
          Agendar consulta
        </button>
      </div>
    </div>
  );
}
