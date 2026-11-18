import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { useCarUiStore } from '../store/useCarUiStore';
import { useAuthStore } from '../store/useAuthStore';

interface CarCardProps {
  car: Car;
  onDelete: (id: string | number) => void;
}

export default function CarCard({ car, onDelete }: CarCardProps) {
  // 1. Pobieramy aktualnie zalogowanego użytkownika[cite: 31, 32]
  const user = useAuthStore((state) => state.user);

  // 2. Pobieramy cały obiekt ulubionych z magazynu Zustand[cite: 31]
  const favoriteCarIdsByUser = useCarUiStore(
    (state) => state.favoriteCarIdsByUser
  );

  // 3. Wybieramy tablicę ulubionych ID dla konkretnego użytkownika[cite: 31]
  const favoriteCarIds = user
    ? favoriteCarIdsByUser[user.id] ?? []
    : [];

  const isFavorite = favoriteCarIds.includes(
    String(car.id)
  );

  const toggleFavorite = useCarUiStore(
    (state) => state.toggleFavorite
  );

  return (
    <div 
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
        <button
          type="button"
          onClick={() => {
            // Przekazujemy ID użytkownika oraz ID samochodu[cite: 32]
            if (user) {
              toggleFavorite(user.id, String(car.id));
            }
          }}
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
          onClick={() => onDelete(car.id)} 
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
  );
}