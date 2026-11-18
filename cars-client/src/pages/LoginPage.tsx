import {
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const user = await login({ email, password });
      setUser(user);
      navigate('/cars');
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError('Nie udało się zalogować. Sprawdź e-mail i hasło.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '450px', margin: '3rem auto', padding: '0 1rem' }}>
      <section
        style={{
          backgroundColor: '#141414',
          border: '1px solid #333',
          borderTop: '4px solid #e50914',
          padding: '2.5rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
        }}
      >
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>
          Logowanie
        </h1>

        {error && (
          <p
            style={{
              backgroundColor: '#3b1717',
              border: '1px solid #e50914',
              color: '#ff8080',
              padding: '0.8rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <label style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              style={{
                padding: '0.7rem',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </label>

          <label style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            Hasło
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              style={{
                padding: '0.7rem',
                backgroundColor: '#222',
                border: '1px solid #444',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '1rem',
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
              padding: '0.8rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '0.5rem',
              boxShadow: '0 4px 12px rgba(229,9,20,0.4)',
            }}
          >
            {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <Link to="/forgot-password" style={{ color: '#aaa', textDecoration: 'none' }}>
            Nie pamiętasz hasła?
          </Link>
          <p style={{ color: '#aaa', margin: 0 }}>
            Nie masz konta?{' '}
            <Link to="/register" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 'bold' }}>
              Zarejestruj się
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}