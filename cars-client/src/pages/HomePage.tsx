import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto', textAlign: 'center' }}>
      <div style={{ 
        backgroundColor: '#141414', 
        border: '1px solid #333', 
        borderTop: '4px solid #e50914',
        padding: '3rem 2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
      }}>
        <h1 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '2.2rem' }}>
          Zarządzanie Samochodami
        </h1>
        <p style={{ color: '#aaaaaa', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Witaj w aplikacji do zarządzania bazą samochodów. Tutaj możesz łatwo przeglądać, dodawać, edytować i usuwać pojazdy.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/cars" 
            style={{ 
              backgroundColor: '#e50914', 
              color: '#ffffff', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(229, 9, 20, 0.4)'
            }}
          >
            Przejdź do listy samochodów
          </Link>
          <Link 
            to="/cars/new" 
            style={{ 
              backgroundColor: 'transparent', 
              color: '#ffffff', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              border: '1px solid #444'
            }}
          >
            + Dodaj nowy pojazd
          </Link>
        </div>
      </div>
    </div>
  );
}