import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      try {
        setLoading(true);
        const data = await getCarById(id);
        setCar(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Błąd podczas pobierania szczegółów samochodu');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <p style={{ color: '#ccc' }}>Ładowanie szczegółów samochodu...</p>;
  if (error) return <p style={{ color: '#ff4d4d' }}>Błąd: {error}</p>;
  if (!car) return <p style={{ color: '#ccc' }}>Nie znaleziono samochodu.</p>;

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h2 style={{ color: '#ffffff', marginBottom: '1.5rem', borderBottom: '2px solid #e50914', paddingBottom: '0.4rem', display: 'inline-block' }}>
        Szczegóły samochodu
      </h2>
      
      {/* Ciemna, elegancka karta z czerwonym akcentem z boku */}
      <div style={{ 
        backgroundColor: '#141414', 
        border: '1px solid #333', 
        borderLeft: '4px solid #e50914',
        padding: '2rem', 
        borderRadius: '8px', 
        marginBottom: '1.5rem', 
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.8)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <p style={{ color: '#aaaaaa' }}>Marka: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.brand}</span></p>
        <p style={{ color: '#aaaaaa' }}>Model: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.model}</span></p>
        <p style={{ color: '#aaaaaa' }}>Data produkcji: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.productionDate}</span></p>
        <p style={{ color: '#aaaaaa' }}>Liczba drzwi: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.doorsNumber}</span></p>
        <p style={{ color: '#aaaaaa' }}>Pojemność bagażnika: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.luggageCapacity} l</span></p>
        <p style={{ color: '#aaaaaa' }}>Pojemność silnika: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.engineCapacity} cm³</span></p>
        <p style={{ color: '#aaaaaa' }}>Rodzaj paliwa: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.fuelType}</span></p>
        <p style={{ color: '#aaaaaa' }}>Średnie zużycie: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.averageFuelConsumption} l/100km</span></p>
        <p style={{ color: '#aaaaaa', gridColumn: 'span 2' }}>Typ nadwozia: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.bodyType}</span></p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link 
          to="/cars" 
          style={{ 
            color: '#ff4d4d', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            padding: '0.6rem 1.2rem',
            border: '1px solid #ff4d4d',
            borderRadius: '4px',
            backgroundColor: 'transparent'
          }}
        >
          ← Powrót do listy
        </Link>
        <Link 
          to={`/cars/${car.id}/edit`} 
          style={{ 
            backgroundColor: '#e50914', 
            color: '#ffffff', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(229, 9, 20, 0.4)'
          }}
        >
          Edytuj ten samochód
        </Link>
      </div>
    </div>
  );
}