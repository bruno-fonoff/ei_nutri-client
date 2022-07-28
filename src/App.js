import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { AuthContextComponent } from "./contexts/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./global.css";
import { PatientUser } from "./pages/User/user";
import { NutriUser } from "./pages/User/admin";
import { NutriLogin } from "./pages/Login/admin";
import { PatientLogin } from "./pages/Login/user";
import { PatientSignup } from "./pages/Signup/user";
import { NutriSignup } from "./pages/Signup/admin";
import { PatientProfile } from "./pages/Profile/user";
import { NutriProfile } from "./pages/Profile/admin";
import { EditPatientProfile } from "./pages/EditProfile/user";
import { Catalog } from "./pages/Catalog";
import { Footer } from "./components/Footer";
import { GoToNutriProfile } from "./pages/UserGoToNutriProfile";
import { EditNutriProfile } from "./pages/EditProfile/admin";

export function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/user" element={<PatientUser />} />
          <Route path="/user/login" element={<PatientLogin />} />
          <Route path="/user/signup" element={<PatientSignup />} />
          <Route path="/user/update-profile" element={<EditPatientProfile />} />
          <Route
            path="/user/profile"
            element={<ProtectedRoute component={PatientProfile} />}
          />
          <Route path="/user/catalog" element={<Catalog />} />
          <Route
            path="/user/nutri-profile/:adminId"
            element={<ProtectedRoute component={GoToNutriProfile} />}
          />

          <Route path="/admin" element={<NutriUser />} />
          <Route path="/admin/login" element={<NutriLogin />} />
          <Route path="/admin/signup" element={<NutriSignup />} />
          <Route path="/admin/update-profile" element={<EditNutriProfile />} />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute component={NutriProfile} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthContextComponent>
    </>
  );
}
