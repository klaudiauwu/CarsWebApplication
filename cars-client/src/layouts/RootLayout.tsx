import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a', 
      color: '#f0f0f0', 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' 
    }}>
      {/* Menu nawigacyjne w stylu czarno-czerwonym */}
      <nav style={{ 
        display: 'flex', 
        gap: '2rem', 
        padding: '1.2rem 2rem', 
        backgroundColor: '#141414', 
        borderBottom: '3px solid #e50914',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)'
      }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({ 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            color: isActive ? '#ff4d4d' : '#cccccc',
            textDecoration: 'none',
            transition: 'color 0.2s'
          })}
        >
          Strona główna
        </NavLink>
        <NavLink 
          to="/cars" 
          style={({ isActive }) => ({ 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            color: isActive ? '#ff4d4d' : '#cccccc',
            textDecoration: 'none',
            transition: 'color 0.2s'
          })}
        >
          Samochody
        </NavLink>
        <NavLink 
          to="/cars/new" 
          style={({ isActive }) => ({ 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            color: isActive ? '#ff4d4d' : '#cccccc',
            textDecoration: 'none',
            transition: 'color 0.2s'
          })}
        >
          Dodaj samochód
        </NavLink>
      </nav>

      {/* Główna zawartość podstron */}
      <main style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
}