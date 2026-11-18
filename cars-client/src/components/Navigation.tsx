import {
  NavLink,
  useNavigate,
} from 'react-router';
import { useCarUiStore } from '../store/useCarUiStore';
import { useAuthStore } from '../store/useAuthStore';

export default function Navigation() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const favoriteCount = useCarUiStore((state) =>
    user
      ? (state.favoriteCarIdsByUser[user.id] ?? []).length
      : 0
  );

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#e50914' : '#ffffff',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'color 0.2s',
  });

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#141414',
        borderBottom: '1px solid #333',
        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <NavLink to="/" style={linkStyle}>
          Strona główna
        </NavLink>

        {user && (
          <>
            <NavLink to="/cars" end style={linkStyle}>
              Samochody
            </NavLink>
            <NavLink to="/cars/new" style={linkStyle}>
              Dodaj samochód
            </NavLink>
          </>
        )}

        <NavLink to="/about" style={linkStyle}>
          O aplikacji
        </NavLink>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>
              Ulubione: <strong style={{ color: '#e50914' }}>{favoriteCount}</strong>
            </span>
            <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>
              {user.userName} ({user.roles.join(', ')})
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                backgroundColor: '#e50914',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 0.9rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}
            >
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={linkStyle}>
              Logowanie
            </NavLink>
            <NavLink
              to="/register"
              style={{
                backgroundColor: '#e50914',
                color: '#fff',
                padding: '0.4rem 1rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}
            >
              Rejestracja
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}