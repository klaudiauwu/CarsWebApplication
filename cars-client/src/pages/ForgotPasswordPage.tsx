import {
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5065/api';
      
      await axios.post(`${API_URL}/account/forgot-password`, { email });

      setSuccessMessage(
        'Jeśli podany adres e-mail istnieje w bazie, wysłano na niego instrukcje resetowania hasła. Sprawdź Mailtrap!'
      );
    } catch (caughtError) {
      if (axios.isAxiosError(caughtError) && caughtError.response?.data) {
        setError(
          typeof caughtError.response.data === 'string'
            ? caughtError.response.data
            : 'Nie udało się wysłać żądania resetowania hasła.'
        );
      } else if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError('Wystąpił błąd podczas wysyłania żądania.');
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
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem' }}>
          Nie pamiętam hasła
        </h1>

        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.5' }}>
          Wprowadź swój adres e-mail powiązany z kontem, a wyślemy Ci link do zresetowania hasła.
        </p>

        {successMessage && (
          <div
            style={{
              backgroundColor: '#1b3320',
              border: '1px solid #2ea44f',
              color: '#43d969',
              padding: '0.8rem',
              borderRadius: '4px',
              marginBottom: '1.5rem',
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
            {isSubmitting ? 'Wysyłanie...' : 'Resetuj hasło'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <Link to="/login" style={{ color: '#aaa', textDecoration: 'none' }}>
            &larr; Powrót do logowania
          </Link>
        </div>
      </section>
    </div>
  );
}