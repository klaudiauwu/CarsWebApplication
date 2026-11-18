import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCarById } from '../services/carService';
import axios from 'axios';
import { useCarUiStore } from '../store/useCarUiStore';

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pobranie stanu ulubionych i akcji ze store
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  useEffect(() => {
    if (!id) return;
    
    const controller = new AbortController();

    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getCarById(id, controller.signal);
        setCar(data);
      } catch (caughtError) {
        if (axios.isCancel(caughtError)) {
          return;
        }

        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError('Błąd podczas pobierania szczegółów samochodu');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCar();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) return <p style={{ color: '#ccc', textAlign: 'center', marginTop: '2rem' }}>Ładowanie szczegółów samochodu...</p>;
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '2rem' }}>Błąd: {error}</p>;
  if (!car) return <p style={{ color: '#ccc', textAlign: 'center', marginTop: '2rem' }}>Nie znaleziono samochodu.</p>;

  const isFavorite = favoriteCarIds.includes(String(car.id));

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #e50914', paddingBottom: '0.4rem' }}>
        <h2 style={{ color: '#ffffff', margin: 0 }}>
          Szczegóły samochodu
        </h2>
        
        {/* Przycisk ulubionych w widoku szczegółów */}
        <button
          type="button"
          onClick={() => toggleFavorite(String(car.id))}
          style={{
            backgroundColor: isFavorite ? '#e50914' : '#222222',
            color: '#ffffff',
            border: '1px solid #444',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          {isFavorite ? 'Ulubiony' : 'Ulubione'}
        </button>
      </div>
      
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
        <p style={{ color: '#aaaaaa', margin: 0 }}>Marka: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.brand}</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Model: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.model}</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Data produkcji: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.productionDate}</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Liczba drzwi: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.doorsNumber}</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Pojemność bagażnika: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.luggageCapacity} l</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Pojemność silnika: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.engineCapacity} cm³</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Rodzaj paliwa: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.fuelType}</span></p>
        <p style={{ color: '#aaaaaa', margin: 0 }}>Średnie zużycie: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.averageFuelConsumption} l/100km</span></p>
        <p style={{ color: '#aaaaaa', margin: 0, gridColumn: 'span 2' }}>Typ nadwozia: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{car.bodyType}</span></p>
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