import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Błąd podczas pobierania listy samochodów');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
      try {
        await deleteCar(String(id)); // <--- Tutaj dodaliśmy String()
        setCars(cars.filter((car) => car.id !== id));
      } catch (err: any) {
        alert('Błąd podczas usuwania: ' + err.message);
      }
    }
  };

  if (loading) return <p style={{ color: '#ccc', textAlign: 'center', marginTop: '2rem' }}>Ładowanie listy samochodów...</p>;
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '2rem' }}>Błąd: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #e50914', paddingBottom: '0.6rem' }}>
        <h2 style={{ color: '#ffffff', margin: 0 }}>Lista samochodów</h2>
        <Link 
          to="/cars/new" 
          style={{ 
            backgroundColor: '#e50914', 
            color: '#ffffff', 
            padding: '0.6rem 1.2rem', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(229, 9, 20, 0.4)'
          }}
        >
          + Dodaj nowy samochód
        </Link>
      </div>

      {cars.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center' }}>Brak samochodów w bazie.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cars.map((car) => (
            <div 
              key={car.id} 
              style={{ 
                backgroundColor: '#141414', 
                border: '1px solid #333', 
                borderLeft: '4px solid #e50914',
                padding: '1.2rem 1.5rem', 
                borderRadius: '6px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div>
                <h3 style={{ color: '#ffffff', margin: '0 0 0.3rem 0', fontSize: '1.2rem' }}>
                  {car.brand} {car.model}
                </h3>
                <p style={{ color: '#888888', margin: 0, fontSize: '0.9rem' }}>
                  Rok produkcji: <span style={{ color: '#cccccc' }}>{car.productionDate}</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <Link 
                  to={`/cars/${car.id}`} 
                  style={{ 
                    color: '#ffffff', 
                    backgroundColor: '#222222', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '4px', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    border: '1px solid #444'
                  }}
                >
                  Szczegóły
                </Link>
                <Link 
                  to={`/cars/${car.id}/edit`} 
                  style={{ 
                    color: '#ffffff', 
                    backgroundColor: '#222222', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '4px', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem',
                    border: '1px solid #444'
                  }}
                >
                  Edytuj
                </Link>
                <button 
                  onClick={() => handleDelete(car.id)} 
                  style={{ 
                    backgroundColor: '#e50914', 
                    color: '#ffffff', 
                    border: 'none', 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 6px rgba(229, 9, 20, 0.3)'
                  }}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}