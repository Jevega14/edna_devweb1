import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarMaterial: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [tela, setTela] = useState('');
    const [color, setColor] = useState('');
    const [costo, setCosto] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/materiales/${id}`);
                if (!response.ok) throw new Error('Material no encontrado.');
                const data = await response.json();
                setTela(data.tela);
                setColor(data.color);
                setCosto(data.costo.toString());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMaterial();
    }, [id]);

    const handleGuardar = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:4000/api/materiales/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ tela, color, costo: parseFloat(costo) })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al actualizar.');
            }
            alert('Material actualizado.');
            navigate('/inventario');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (isLoading) return <div>Cargando material...</div>;

    return (
        <div style={{ maxWidth: 480, margin: '4rem auto' }}>
            <h2>Editar Material</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Aquí iría un formulario similar al de NuevoMaterial.tsx */}
            <input value={tela} onChange={e => setTela(e.target.value)} placeholder="Tela" />
            <input value={color} onChange={e => setColor(e.target.value)} placeholder="Color" />
            <input type="number" value={costo} onChange={e => setCosto(e.target.value)} placeholder="Costo" />
            <button onClick={handleGuardar}>Guardar Cambios</button>
            <button onClick={() => navigate('/inventario')}>Cancelar</button>
        </div>
    );
};

export default EditarMaterial;