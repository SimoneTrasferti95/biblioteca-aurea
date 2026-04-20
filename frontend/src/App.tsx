import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CatalogPage from "./pages/CatalogPage";
import MyRentalsPage from "./pages/MyRentalsPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./router/ProtectedRoute";
import AdminRoute from "./router/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />

          <Route
            path="/my-rentals"
            element={
              <ProtectedRoute>
                <MyRentalsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;