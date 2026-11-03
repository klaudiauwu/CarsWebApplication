import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CreateCarPage from './pages/CreateCarPage';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Trasy posiadające menu nawigacyjne */}
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cars">
          <Route index element={<CarsPage />} />
          <Route path="new" element={<CreateCarPage />} />
          <Route path=":id" element={<CarDetailsPage />} />
          <Route path=":id/edit" element={<EditCarPage />} />
        </Route>
      </Route>

      {/* Trasa 404 poza layoutem – pasek nawigacji nie będzie się tu pojawiał */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}