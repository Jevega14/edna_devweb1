import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const NuevaPrenda: React.FC = () => {
    const navigate = useNavigate();

    // Estados para cada campo del formulario, con valores por defecto para los selectores
    const [tipo, setTipo] = useState('Gorra');
    const [talla, setTalla] = useState('M');
    const [logoPath, setLogoPath] = useState('');
    const [imagenPath, setImagenPath] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Función para subir un archivo al backend y obtener su ruta
    const handleFileUpload = async (file: File, setPath: React.Dispatch<React.SetStateAction<string>>) => {
        setIsUploading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', file); // 'image' debe coincidir con upload.single('image') en el backend

        try {
            const response = await fetch('http://localhost:4000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir el archivo.');
            }

            const data = await response.json();
            setPath(data.filePath); // Guardamos la ruta del archivo
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPath: React.Dispatch<React.SetStateAction<string>>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file, setPath);
        }
    };

    const handleGuardar = async () => {
        setIsSaving(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        const adminId = localStorage.getItem('adminId');

        if (!token || !adminId) {
            setError('Debes iniciar sesión como administrador para agregar prendas.');
            setIsSaving(false);
            return;
        }
        if (!tipo.trim() || !talla.trim()) {
            setError('El tipo y la talla son campos obligatorios.');
            setIsSaving(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/prendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    tipo,
                    talla,
                    logo: logoPath, // Enviamos la ruta del logo
                    imagen: imagenPath, // Enviamos la ruta de la imagen
                    administrador_id: parseInt(adminId)
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al guardar la prenda.');
            }

            alert('¡Prenda agregada exitosamente!');
            navigate('/inventario');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 480, width: '100%' }}>
                <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, textAlign: 'center', marginBottom: '2rem' }}>Agregar Nueva Prenda</h2>

                {error && <p style={{ color: '#dc3545', textAlign: 'center', background: '#f8d7da', padding: '10px', borderRadius: '8px' }}>{error}</p>}
                {isUploading && <p style={{ color: '#007bff', textAlign: 'center' }}>Subiendo imagen...</p>}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="tipo">Tipo de Prenda</label>
                    {/* --- CAMBIO A MENÚ DESPLEGABLE --- */}
                    <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-input">
                        <option value="Gorra">Gorra</option>
                        <option value="Camisa">Camisa</option>
                        <option value="Pantalón">Pantalón</option>
                        <option value="Gafas">Gafas</option>
                        {/* Puedes añadir más opciones aquí */}
                    </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="talla">Talla Base</label>
                    {/* --- CAMBIO A MENÚ DESPLEGABLE --- */}
                    <select id="talla" value={talla} onChange={(e) => setTalla(e.target.value)} className="form-input">
                        <option value="XXS">XXS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="imagen">Imagen de la Prenda</label>
                    <input id="imagen" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImagenPath)} className="form-input" />
                    {imagenPath && <img src={`http://localhost:4000${imagenPath}`} alt="Previsualización de prenda" style={{maxWidth: '100px', marginTop: '10px', borderRadius: '8px'}} />}
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="logo">Logo</label>
                    <input id="logo" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogoPath)} className="form-input" />
                    {logoPath && <img src={`http://localhost:4000${logoPath}`} alt="Previsualización de logo" style={{maxWidth: '100px', marginTop: '10px', borderRadius: '8px'}} />}
                </div>

                <button className="edna-btn" onClick={handleGuardar} disabled={isUploading || isSaving}>
                    {isSaving ? 'Guardando...' : 'Guardar Prenda'}
                </button>
                <button className="edna-btn" style={{ marginTop: '1rem', background: '#6c757d' }} onClick={() => navigate('/inventario')}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default NuevaPrenda;