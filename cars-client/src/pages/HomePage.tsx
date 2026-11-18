import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import { login } from '../services/authService';
import { useCarUiStore } from '../store/useCarUiStore';

export default function HomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const favoriteCount = useCarUiStore((state) =>
    user ? (state.favoriteCarIdsByUser[user.id] ?? []).length : 0
  );

  async function handleLoginSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      const loggedUser = await login({ email, password });
      setUser(loggedUser);
      navigate('/cars');
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError('Nie udało się zalogować.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <div
        style={{
          backgroundColor: '#141414',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#e50914',
          }}
        />

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.8rem' }}>
            Zarządzanie Samochodami
          </h1>
          <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Witaj w aplikacji do zarządzania bazą pojazdów. Przeglądaj, dodawaj, edytuj i oznaczaj ulubione auta w nowoczesnym stylu.
          </p>
        </div>

        {user ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>
              Witaj ponownie, <span style={{ color: '#e50914' }}>{user.userName}</span>!
            </h3>
            <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
              Twoje konto posiada uprawnienia: <strong>{user.roles.join(', ')}</strong> | Ulubione pojazdy: <strong>{favoriteCount}</strong>
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/cars"
                style={{
                  backgroundColor: '#e50914',
                  color: '#fff',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(229,9,20,0.4)',
                }}
              >
                Przejdź do listy samochodów
              </Link>
              <Link
                to="/cars/new"
                style={{
                  backgroundColor: '#222',
                  color: '#fff',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  border: '1px solid #444',
                }}
              >
                + Dodaj nowy pojazd
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <div>
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.3rem' }}>
                Dlaczego warto?
              </h3>
              <ul style={{ color: '#bbb', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
                <li>Pełna kontrola nad bazą danych pojazdów w czasie rzeczywistym.</li>
                <li>Bezpieczne uwierzytelnianie oparte na tokenach JWT.</li>
                <li>Możliwość personalizacji listy ulubionych aut dla każdego konta.</li>
                <li>Podział na role użytkowników i administratorów.</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  to="/register"
                  style={{
                    color: '#e50914',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Nie masz konta? Zarejestruj się &rarr;
                </Link>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#1a1a1a',
                padding: '1.5rem',
                borderRadius: '6px',
                border: '1px solid #333',
              }}
            >
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.2rem' }}>
                Szybkie logowanie
              </h3>

              {error && (
                <p style={{ color: '#ff4d4d', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ color: '#ccc', fontSize: '0.9rem' }}>
                  E-mail
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      marginTop: '0.3rem',
                      backgroundColor: '#222',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                  />
                </label>

                <label style={{ color: '#ccc', fontSize: '0.9rem' }}>
                  Hasło
                  <input
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      marginTop: '0.3rem',
                      backgroundColor: '#222',
                      border: '1px solid #444',
                      borderRadius: '4px',
                      color: '#fff',
                    }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#e50914',
                    color: '#fff',
                    border: 'none',
                    padding: '0.7rem',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                  }}
                >
                  {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}