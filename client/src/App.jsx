import './css/style.css';
import './charts/ChartjsConfig';
import { AuthProviderAdmin } from "./context/AuthContextAdmin.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage.jsx'
import Principal from "./pages/Principal/Principal.jsx";
import ProtectedRouteAdmin from "./pages/Admin/ProtectedRouteAdmin.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Platillos from "./pages/Admin/Platillos/Platillos.jsx";
import Mesas from "./pages/Admin/Mesas/Mesas.jsx";
import Calendario from './pages/Admin/Calendario/Calendario.jsx';
import { AdminContext } from './context/AdminContext.jsx';
import Reservas from './pages/Admin/Reservas/Reservas.jsx';


function App() {
  return (
    <AuthProviderAdmin>
      <AdminContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/admin-login" element={<LoginPage />} />

            <Route element={<ProtectedRouteAdmin />}>

              {/* Dashboard */}
              <Route path="/admin" element={<Admin />} />
              {/* Reservas */}
              <Route path="/admin/reservas" element={<Reservas />} />
              {/* Platillos */}
              <Route path="/admin/platillos" element={<Platillos />} />
              {/* Mesas */}
              <Route path="/admin/mesas" element={<Mesas />} />
              {/* Calendario */}
              <Route path="/admin/calendario" element={<Calendario />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </AdminContext>
    </AuthProviderAdmin>
  );
}

export default App;
