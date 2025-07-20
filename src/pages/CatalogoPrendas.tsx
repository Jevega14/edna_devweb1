import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Puedes crear un CSS específico si lo necesitas

// Interfaz para la estructura de una prenda
interface Prenda {
    id: number;
    tipo: string;
    talla: string;
    logo?: string;
    imagen?: string;
    admin: {
        nombre: string;
    };
}

const CatalogoPrendas: React.FC = () => {
    const [prendas, setPrendas] = useState<Prenda[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrendas = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/prendas');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las prendas.');
                }
                const data: Prenda[] = await response.json();
                setPrendas(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrendas();
    }, []);

    if (isLoading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando catálogo...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', marginTop: '2rem' }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Catálogo de Prendas</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {prendas.map(prenda => (
                    <div key={prenda.id} className="edna-user-card" style={{ cursor: 'default', height: 'auto', padding: '1rem' }}>
                        <img
                            src={prenda.imagen || `https://placehold.co/200x200/EEE/333?text=${prenda.tipo}`}
                            alt={prenda.tipo}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }}
                        />
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{prenda.tipo}</h3>
                        <p style={{ margin: '0.2rem 0' }}>Talla: <strong>{prenda.talla}</strong></p>
                        <p style={{ margin: '0.2rem 0', fontSize: '0.9em', color: '#555' }}>Diseñado por: {prenda.admin.nombre}</p>
                    </div>
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 1.5rem 0' }}>
                <button className="edna-btn" onClick={() => navigate('/usuario')}>
                    ↩ Volver
                </button>
            </div>
        </div>
    );
};

export default CatalogoPrendas;