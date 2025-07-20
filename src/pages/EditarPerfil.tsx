import React, { useState, useEffect } from 'react';
import '../styles.css';
import './styles/EditarPerfil.css';

// Interfaz para los datos del perfil
interface UserProfile {
    nombre: string;
    username: string;
    direccion: string;
    telefono: string;
    // No incluimos campos de contraseña aquí por ahora
}

const EditarPerfil: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        nombre: '',
        username: '',
        direccion: '',
        telefono: '',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect se ejecuta cuando el componente se carga
    useEffect(() => {
        const fetchProfile = async () => {
            // Obtenemos el ID del usuario que guardamos en el login
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('No se pudo encontrar el ID del usuario. Por favor, inicie sesión de nuevo.');
                setIsLoading(false);
                return;
            }

            try {
                // 1. Hacemos la petición GET para obtener los datos
                const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar la información del perfil.');
                }
                const data = await response.json();
                setProfile(data); // Rellenamos el formulario con los datos
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []); // El array vacío asegura que se ejecute solo una vez

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        const userId = localStorage.getItem('userId');
        setError(null);

        try {
            // 2. Hacemos la petición PUT para actualizar los datos
            const response = await fetch(`http://localhost:4000/api/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al guardar el perfil.');
            }

            alert('Perfil actualizado correctamente.');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Cargando perfil...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red', marginTop: '5rem' }}>Error: {error}</div>;
    }

    return (
        <div className="edna-home" style={{ maxWidth: 540, margin: '3rem auto', padding: '2.5rem 2rem', textAlign: 'left' }}>
            <div className="profile-title-group">
                <h2 className="profile-title">Editar mi perfil</h2>
            </div>

            {/* Campos del formulario */}
            <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" id="nombre" className="form-input" value={profile.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="username" className="form-label">Nombre de usuario</label>
                <input type="text" id="username" className="form-input" value={profile.username} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input type="text" id="direccion" className="form-input" value={profile.direccion} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="tel" id="telefono" className="form-input" value={profile.telefono} onChange={handleChange} />
            </div>

            {/* Omitimos los campos de contraseña por ahora para simplificar */}

            <button onClick={handleSave} className="edna-btn" style={{ width: '100%', marginTop: '1.5rem' }}>
                Guardar modificaciones
            </button>
        </div>
    );
};

export default EditarPerfil;

