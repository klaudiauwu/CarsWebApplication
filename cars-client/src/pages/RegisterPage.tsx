import {
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router';

import {
  register,
} from '../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      // Wywołanie funkcji rejestracji z serwisu
      await register({
        email,
        userName,
        password,
      });

      setSuccessMessage(
        'Rejestracja przebiegła pomyślnie! Sprawdź skrzynkę e-mail (lub Mailtrap), aby potwierdzić konto.',
      );

      // Automatyczne przekierowanie do logowania po 4 sekundach
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
    catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      }
      else {
        setError('Nie udało się zarejestrować użytkownika.');
      }
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '450px', margin: '2rem auto', padding: '0 1rem' }}>
      <section
        style={{
          backgroundColor: '#141414',
          border: '1px solid #333',
          borderTop: '4px solid #e50914',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
        }}
      >
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>
          Rejestracja
        </h1>

        {successMessage && (
          <div
            style={{
              backgroundColor: '#1b3320',
              border: '1px solid #2ea44f',
              color: '#43d969',
              padding: '0.8rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              textAlign: 'center',
            }}
          >
            {successMessage}
          </div>
        )}

        {error && (
          <p
            style={{
              backgroundColor: '#3b1717',
              border: '1px solid #e50914',
              color: '#ff8080',
              padding: '0.8rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}

        <form
          className="car-form"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <label style={{ color: '#ccc', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            Nazwa użytkownika (UserName)
            <input
              type="text"
              value={userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
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
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
            }}
          >
            {isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj się'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#aaa', fontSize: '0.9rem' }}>
          Masz już konto?{' '}
          <Link to="/login" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 'bold' }}>
            Zaloguj się
          </Link>
        </p>
      </section>
    </div>
  );
}