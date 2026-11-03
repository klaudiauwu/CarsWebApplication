import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a', 
      color: '#f0f0f0', 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%',
        backgroundColor: '#141414', 
        border: '1px solid #333', 
        borderTop: '4px solid #e50914',
        padding: '3rem 2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#e50914', fontSize: '3.5rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
          404
        </h1>
        <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.4rem' }}>
          Nie znaleziono strony
        </h2>
        <p style={{ color: '#aaaaaa', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Przepraszamy, podany adres nie istnieje w naszej aplikacji.
        </p>
        <Link 
          to="/" 
          style={{ 
            backgroundColor: '#e50914', 
            color: '#ffffff', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(229, 9, 20, 0.4)',
            display: 'inline-block'
          }}
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}