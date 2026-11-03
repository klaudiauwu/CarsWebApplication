import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCarById, updateCar } from '../services/carService';
import type { NewCar } from '../models/Car';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<NewCar | null>(null);
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
        setError(err.message || 'Błąd podczas pobierania danych samochodu');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !car) return;
    try {
      await updateCar(id, car);
      navigate(`/cars/${id}`);
    } catch (err: any) {
      alert('Błąd podczas aktualizacji: ' + err.message);
    }
  };

  if (loading) return <p style={{ color: '#ccc' }}>Ładowanie danych samochodu...</p>;
  if (error) return <p style={{ color: '#ff4d4d' }}>Błąd: {error}</p>;
  if (!car) return <p style={{ color: '#ccc' }}>Nie znaleziono samochodu.</p>;

  const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#141414',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '4px',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.3rem',
    color: '#aaaaaa',
    fontWeight: '500'
  };

  return (
    <div style={{ maxWidth: '550px', margin: '0 auto', paddingBottom: '2rem' }}>
      <h2 style={{ color: '#ffffff', marginBottom: '1.5rem', borderBottom: '2px solid #e50914', paddingBottom: '0.4rem', display: 'inline-block' }}>
        Edytuj samochód
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#141414', padding: '2rem', borderRadius: '8px', border: '1px solid #333', borderLeft: '4px solid #e50914' }}>
        <div>
          <label style={labelStyle}>Marka:</label>
          <input
            type="text"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Model:</label>
          <input
            type="text"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Liczba drzwi:</label>
          <input
            type="number"
            value={car.doorsNumber}
            onChange={(e) => setCar({ ...car, doorsNumber: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Pojemność bagażnika (l):</label>
          <input
            type="number"
            value={car.luggageCapacity}
            onChange={(e) => setCar({ ...car, luggageCapacity: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Pojemność silnika (cm³):</label>
          <input
            type="number"
            value={car.engineCapacity}
            onChange={(e) => setCar({ ...car, engineCapacity: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Rodzaj paliwa (ID):</label>
          <input
            type="number"
            value={car.fuelType}
            onChange={(e) => setCar({ ...car, fuelType: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Data produkcji:</label>
          <input
            type="date"
            value={car.productionDate}
            onChange={(e) => setCar({ ...car, productionDate: e.target.value })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Średnie spalanie (l/100km):</label>
          <input
            type="number"
            step="0.1"
            value={car.averageFuelConsumption}
            onChange={(e) => setCar({ ...car, averageFuelConsumption: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Typ nadwozia (ID):</label>
          <input
            type="number"
            value={car.bodyType}
            onChange={(e) => setCar({ ...car, bodyType: Number(e.target.value) })}
            required
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={{ 
            padding: '0.8rem', 
            backgroundColor: '#e50914', 
            color: '#ffffff', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '4px', 
            fontWeight: 'bold',
            fontSize: '1rem',
            marginTop: '1rem',
            boxShadow: '0 2px 8px rgba(229, 9, 20, 0.4)'
          }}
        >
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}