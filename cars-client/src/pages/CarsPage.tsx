import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';
import { useCarUiStore } from '../store/useCarUiStore';
import CarCard from '../components/CarCard';
import axios from 'axios';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchTerm = useCarUiStore((state) => state.searchTerm);
  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
  const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  
  // Krok 17: Pobranie removeFavorite ze store
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        setLoading(true);
        setError(null);
        
        const loadedCars = await getCars(controller.signal);
        setCars(loadedCars);
      } catch (caughtError) {
        if (axios.isCancel(caughtError)) {
          return;
        }

        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError('Wystąpił nieznany błąd.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCars();

    return () => {
      controller.abort();
    };
  }, []);

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
      try {
        const stringId = String(id);
        await deleteCar(stringId); 
        
        // Krok 17: Usunięcie ze stanu ulubionych po udanym usunięciu z API
        removeFavorite(stringId); 

        setCars((currentCars) =>
          currentCars.filter((car) => car.id !== id)
        );
      } catch (err: any) {
        alert('Błąd podczas usuwania: ' + err.message);
      }
    }
  };

  // Logika filtrowania i wyszukiwania
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredCars = cars.filter((car) => {
    const matchesSearch = 
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);
    
    const matchesFavorites = 
      !showFavoritesOnly || favoriteCarIds.includes(String(car.id));

    return matchesSearch && matchesFavorites;
  });

  if (loading) return <p style={{ color: '#ccc', textAlign: 'center', marginTop: '2rem' }}>Ładowanie listy samochodów...</p>;
  if (error) return <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '2rem' }}>Błąd: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0', paddingBottom: '2rem' }}>
      {/* Nagłówek strony i przycisk dodawania */}
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

      {/* Pasek narzędzi (wyszukiwarka i filtr ulubionych) */}
      <div className="cars-toolbar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Szukaj po marce lub modelu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.6rem 1rem',
            backgroundColor: '#141414',
            border: '1px solid #333',
            color: '#fff',
            borderRadius: '4px',
            outline: 'none'
          }}
        />
        <label className="favorite-filter" style={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Tylko ulubione
        </label>
      </div>

      {/* Lista samochodów / komunikat o braku */}
      {filteredCars.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>Brak samochodów spełniających kryteria.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}