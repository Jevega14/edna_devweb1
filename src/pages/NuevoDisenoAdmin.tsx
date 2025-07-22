import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

// Interfaces para los datos que cargaremos de la BD
interface Prenda {
    id: number;
    tipo: string;
}
interface Material {
    id: number;
    tela: string;
}

const NuevoDisenoAdmin: React.FC = () => {
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [prendaId, setPrendaId] = useState('');
    const [materialId, setMaterialId] = useState('');

    // Estados para cargar los datos de los selectores
    const [prendas, setPrendas] = useState<Prenda[]>([]);
    const [materiales, setMateriales] = useState<Material[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect para cargar las prendas y materiales disponibles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prendasRes, materialesRes] = await Promise.all([
                    fetch('http://localhost:4000/api/prendas'),
                    fetch('http://localhost:4000/api/materiales')
                ]);

                if (!prendasRes.ok || !materialesRes.ok) {
                    throw new Error('No se pudo cargar el inventario base (prendas y materiales).');
                }

                const prendasData = await prendasRes.json();
                const materialesData = await materialesRes.json();

                setPrendas(prendasData);
                setMateriales(materialesData);

                // Establecer un valor por defecto para los selectores
                if (prendasData.length > 0) setPrendaId(prendasData[0].id.toString());
                if (materialesData.length > 0) setMaterialId(materialesData[0].id.toString());

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleGuardar = async () => {
        const token = localStorage.getItem('authToken');
        // Para crear un diseño, usamos el ID del admin/diseñador logueado
        const adminId = localStorage.getItem('adminId');

        if (!token || !adminId) {
            alert("Debes iniciar sesión como administrador para crear un diseño.");
            return;
        }
        if (!nombre.trim() || !prendaId || !materialId) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/disenos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre,
                    prenda_id: parseInt(prendaId),
                    material_id: parseInt(materialId)
                    // El backend usará el ID del token, así que no necesitamos enviar 'usuario_id'
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error al crear el diseño.");
            }

            alert("¡Diseño creado exitosamente!");
            navigate('/inventario'); // O a la página de ver diseños de admin

        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: 480, margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Crear Nuevo Diseño</h2>
            <div style={{ marginBottom: '1rem' }}>
                <label>Nombre del Diseño</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%', padding: '0.7rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Seleccionar Prenda Base</label>
                <select value={prendaId} onChange={e => setPrendaId(e.target.value)} style={{ width: '100%', padding: '0.7rem' }}>
                    {prendas.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
                </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
                <label>Seleccionar Material</label>
                <select value={materialId} onChange={e => setMaterialId(e.target.value)} style={{ width: '100%', padding: '0.7rem' }}>
                    {materiales.map(m => <option key={m.id} value={m.id}>{m.tela}</option>)}
                </select>
            </div>
            <button className="edna-btn" style={{ width: '100%' }} onClick={handleGuardar}>Guardar Diseño</button>
            <button className="edna-btn" style={{ width: '100%', marginTop: '1rem', background: '#6c757d' }} onClick={() => navigate('/inventario')}>
                Cancelar
            </button>
        </div>
    );
};

export default NuevoDisenoAdmin;
