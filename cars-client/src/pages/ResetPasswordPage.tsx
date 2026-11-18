import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import axios from 'axios';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const rawToken = searchParams.get('token');
  
  // Naprawiamy spacje zamienione przez przeglądarkę na znaki '+' w tokenie
  const token = rawToken ? rawToken.replace(/ /g, '+') : null;

  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !token) {
      setStatus('error');
      setErrorMessage('Nieprawidłowy lub niekompletny link resetowania hasła.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage(null);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5065/api';
      
      // Zależnie od backendu, endpoint to zazwyczaj /auth/reset-password lub /account/reset-password
      await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        token,
        newPassword: password,
      });

      setStatus('success');
    } catch (caughtError) {
      setStatus('error');
      if (axios.isAxiosError(caughtError) && caughtError.response?.data) {
        setErrorMessage(
          typeof caughtError.response.data === 'string'
            ? caughtError.response.data
            : 'Nie udało się zresetować hasła.'
        );
      } else if (caughtError instanceof Error) {
        setErrorMessage(caughtError.message);
      } else {
        setErrorMessage('Wystąpił nieoczekiwany błąd podczas zmiany hasła.');
      }
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
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem' }}>
          Ustaw nowe hasło
        </h1>

        {status === 'success' ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                backgroundColor: '#1b3320',
                border: '1px solid #2ea44f',
                color: '#43d969',
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
              }}
            >
              Hasło zostało pomyślnie zmienione! Możesz się teraz zalogować nowym hasłem.
            </div>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                backgroundColor: '#e50914',
                color: '#fff',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(229,9,20,0.4)',
              }}
            >
              Przejdź do logowania
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {errorMessage && (
              <p
                style={{
                  backgroundColor: '#3b1717',
                  border: '1px solid #e50914',
                  color: '#ff8080',
                  padding: '0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {errorMessage}
              </p>
            )}

            <p style={{ color: '#aaa', fontSize: '0.9rem', textAlign: 'center', margin: 0, lineHeight: '1.4' }}>
              Wprowadź nowe, bezpieczne hasło dla swojego konta.
            </p>

            <label style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              Nowe hasło
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
              disabled={status === 'loading'}
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
              {status === 'loading' ? 'Zmienianie...' : 'Zmień hasło'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}