import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

export default function RootLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#f0f0f0',
        fontFamily:
          'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      {/* Tutaj wrzucamy nasz osobny komponent nawigacji */}
      <Navigation />

      {/* Główna treść strony (zmieniające się podstrony) */}
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}