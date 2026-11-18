import { Routes, Route } from 'react-router';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutPage from './pages/AboutPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import CarsPage from './pages/CarsPage';
import CreateCarPage from './pages/CreateCarPage';
import CarDetailsPage from './pages/CarDetailsPage';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Strona główna */}
        <Route index element={<HomePage />} />

        {/* Trasy publiczne (uwzględniające zadanie samodzielne) */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* Trasy obsługi maili i haseł */}
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        {/* Trasy chronione wymagające zalogowania */}
        <Route element={<ProtectedRoute />}>
          <Route path="cars">
            <Route index element={<CarsPage />} />
            <Route path="new" element={<CreateCarPage />} />
            <Route path=":id" element={<CarDetailsPage />} />
            <Route path=":id/edit" element={<EditCarPage />} />
          </Route>
        </Route>

        {/* Strona 404 - nie znaleziono */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}