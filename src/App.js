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

import { Teste } from './components/Calendar/rota-teste';

export function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/user" element={<PatientUser />} />
          <Route path="/user/login" element={<PatientLogin />} />
          <Route path="/user/signup" element={<PatientSignup />} />
          <Route
            path="/user/profile"
            element={<ProtectedRoute component={PatientProfile} />}
          />

          <Route path="/admin" element={<NutriUser />} />
          <Route path="/admin/login" element={<NutriLogin />} />
          <Route path="/admin/signup" element={<NutriSignup />} />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute component={NutriProfile} />}
          />

          <Route path="*" element={<ErrorPage />} />

          <Route path='/teste' element={<Teste />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}
