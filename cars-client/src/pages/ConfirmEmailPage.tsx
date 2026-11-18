import { useEffect, useState, type SyntheticEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { confirmEmail } from '../services/authService';
import axios from 'axios';

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const urlEmail = searchParams.get('email') || searchParams.get('userId');
  const rawToken = searchParams.get('token');
  const urlToken = rawToken ? rawToken.replace(/ /g, '+') : null;

  const [identifier, setIdentifier] = useState(urlEmail || '');
  const [token, setToken] = useState(urlToken || '');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    urlEmail && urlToken ? 'loading' : 'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Automatyczna weryfikacja, jeśli parametry były w adresie URL
  useEffect(() => {
    if (!urlEmail || !urlToken) return;

    const verifyEmail = async () => {
      try {
        setStatus('loading');
        await confirmEmail(urlEmail, urlToken);
        setStatus('success');
      } catch (caughtError) {
        setStatus('error');
        setErrorMessage(
          axios.isAxiosError(caughtError) && caughtError.response?.data
            ? typeof caughtError.response.data === 'string'
              ? caughtError.response.data
              : 'Nie udało się potwierdzić adresu e-mail.'
            : 'Wystąpił błąd podczas potwierdzania e-maila.'
        );
      }
    };

    verifyEmail();
  }, [urlEmail, urlToken]);

  // Ręczna weryfikacja przez formularz
  async function handleManualSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!identifier || !token) {
      setErrorMessage('Wprowadź e-mail/identyfikator oraz token.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage(null);
      const fixedToken = token.replace(/ /g, '+');
      await confirmEmail(identifier, fixedToken);
      setStatus('success');
    } catch (caughtError) {
      setStatus('error');
      setErrorMessage(
        axios.isAxiosError(caughtError) && caughtError.response?.data
          ? typeof caughtError.response.data === 'string'
            ? caughtError.response.data
            : 'Nie udało się potwierdzić adresu e-mail.'
          : 'Wystąpił błąd podczas potwierdzania e-maila.'
      );
    }
  }

  return (
    <div style={{ maxWidth: '480px', margin: '4rem auto', padding: '0 1rem' }}>
      <section
        style={{
          backgroundColor: '#141414',
          border: '1px solid #333',
          borderTop: '4px solid #e50914',
          padding: '2.5rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
          Potwierdzenie e-maila
        </h1>

        {status === 'loading' && (
          <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Trwa weryfikacja Twojego adresu e-mail, proszę czekać...
          </p>
        )}

        {status === 'success' && (
          <div>
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
              Twoje konto zostało pomyślnie zweryfikowane! Możesz się teraz zalogować.
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
              }}
            >
              Przejdź do logowania
            </Link>
          </div>
        )}

        {(status === 'error' || status === 'idle') && (
          <div>
            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#3b1717',
                  border: '1px solid #e50914',
                  color: '#ff8080',
                  padding: '0.8rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                }}
              >
                {errorMessage}
              </div>
            )}

            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.2rem', textAlign: 'left' }}>
              Wklej dane z wiadomości Mailtrap poniżej:
            </p>

            <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <label style={{ color: '#ccc', fontSize: '0.85rem' }}>
                E-mail lub ID użytkownika
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff' }}
                />
              </label>
              <label style={{ color: '#ccc', fontSize: '0.85rem' }}>
                Token aktywacyjny
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', color: '#fff' }}
                />
              </label>
              <button
                type="submit"
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
                Potwierdź ręcznie
              </button>
            </form>

            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/login" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>
                &larr; Powrót do logowania
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}