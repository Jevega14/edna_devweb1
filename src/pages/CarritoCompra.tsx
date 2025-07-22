import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineaDiseño } from './CrearDiseños';
import './styles/DiseñosGuardados.css';

interface SavedDesign {
    id: number;
    nombre: string;
    lineas: LineaDiseño[];
    costoTotal: number;
}

interface Prenda {
    id: number;
    imagen?: string;
}

const DiseñosGuardados: React.FC = () => {
    const navigate = useNavigate();

    const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
    const [allPrendas, setAllPrendas] = useState<Prenda[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDesigns, setSelectedDesigns] = useState<number[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const prendasRes = await fetch('http://localhost:4000/api/prendas');
                if (!prendasRes.ok) {
                    throw new Error('No se pudo cargar la información de las prendas.');
                }
                const prendasData: Prenda[] = await prendasRes.json();
                setAllPrendas(prendasData);

                const designsFromStorage = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
                setSavedDesigns(designsFromStorage);
            } catch (error) {
                console.error(error);
                alert("Hubo un error al cargar los datos.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const eliminarDiseño = (designId: number) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este diseño?")) {
            const updatedDesigns = savedDesigns.filter(d => d.id !== designId);
            localStorage.setItem('savedDesigns', JSON.stringify(updatedDesigns));
            setSavedDesigns(updatedDesigns);
        }
    };

    const handleSelectDesign = (designId: number) => {
        setSelectedDesigns(prevSelected => {
            if (prevSelected.includes(designId)) {
                return prevSelected.filter(id => id !== designId);
            } else {
                return [...prevSelected, designId];
            }
        });
    };

    // --- FUNCIÓN MODIFICADA ---
    const handleAddToCart = () => {
        if (selectedDesigns.length === 0) {
            alert("Por favor, selecciona al menos un diseño.");
            return;
        }
        // Simplemente mostramos la notificación y no hacemos nada más
        alert("Se adicionó al carrito");
        // Opcional: limpiar la selección después de "añadir"
        setSelectedDesigns([]);
    };

    if (isLoading) {
        return <div>Cargando diseños guardados...</div>;
    }

    return (
        <div className="gallery-container">
            <header className="header">
                <h2>Mis diseños</h2>
            </header>
            <main className="main-content-gallery">
                <div className="design-cards-grid">
                    {savedDesigns.length > 0 ? (
                        savedDesigns.map(design => {
                            const isSelected = selectedDesigns.includes(design.id);
                            const primeraPrendaId = design.lineas[0]?.prendaId;
                            const prendaInfo = allPrendas.find(p => p.id === parseInt(primeraPrendaId));
                            const imagenSrc = prendaInfo?.imagen
                                ? `http://localhost:4000${prendaInfo.imagen}`
                                : `https://placehold.co/120x120/AEC6CF/000?text=${design.nombre.substring(0, 10)}`;

                            return (
                                <div key={design.id} className={`design-card ${isSelected ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        className="design-checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelectDesign(design.id)}
                                    />
                                    <img
                                        src={imagenSrc}
                                        alt={design.nombre}
                                        className="design-card-image"
                                    />
                                    <h3 className="design-card-title">{design.nombre}</h3>
                                    <div className="design-card-actions">
                                        <button className="edit-button">Editar</button>
                                        <button onClick={() => eliminarDiseño(design.id)} className="remove-design-button">Eliminar</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No tienes diseños guardados todavía. ¡Crea uno nuevo!</p>
                    )}
                </div>
                <div className="bottom-actions">
                    <button onClick={() => navigate('/creardiseño')} className="create-design-button">
                        + Crear nuevo diseño
                    </button>
                    <button className="action-button">Seleccionar todos</button>
                    <button className="action-button" onClick={() => navigate('/usuario')}>↩ Volver</button>
                    <button onClick={handleAddToCart} className="action-button add-to-cart-button">Añadir diseño al carrito</button>
                    <button className="action-button remove-all-button">Eliminar de mis diseños</button>
                </div>
            </main>
        </div>
    );
};

export default DiseñosGuardados;