import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { AuthContextComponent } from "./contexts/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./global.css";
import { PatientUser } from "./pages/User/user";
import { NutriUser } from "./pages/User/admin";
import { NutriLogin } from "./pages/Login/admin";
import { UserLogin } from "./pages/Login/user";
import { UserSignup } from "./pages/Signup/user";
import { AdminSignup } from "./pages/Signup/admin";
import { UserProfile } from "./pages/Profile/user";
import { AdminProfile } from "./pages/Profile/admin";
import { Teste } from "./pages/Teste";

export function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/teste" element={<Teste />} />

          <Route path="/user" element={<PatientUser />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route
            path="/user/profile"
            element={<ProtectedRoute component={<UserProfile />} />}
          />

          <Route path="/admin" element={<NutriUser />} />
          <Route path="/admin/login" element={<NutriLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute component={<AdminProfile />} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}
