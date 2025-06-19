
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleRegistrarse = () => {
        navigate('/register');
    };

    const handleIniciarSesion = () => {
        navigate('/login');
    };

    // Placeholder functions for navigation, you can replace with actual routes
    const handleNavigation = (path: string) => {
        alert(`Navegar a: ${path}`);
        // navigate(path); // Uncomment this line if you have react-router-dom configured for these paths
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1 className="header-title">EdnaModa</h1> {/* Added a class for styling */}
            </header>

            <main className="home-main">
                <div className="welcome-section">
                    <h2 className="welcome-title">¡Bienvenido a EdnaModa!</h2>
                    <p className="welcome-subtitle">Donde tus diseños soñados se hacen realidad</p>
                </div>

                <div className="auth-section">
                    <div className="auth-option">
                        <h3>¿Primera vez?</h3>
                        <button className="auth-button register-button" onClick={handleRegistrarse}>
                            Registrarse
                        </button>
                    </div>

                    <div className="auth-option">
                        <h3>¿Ya estás registrado?</h3>
                        <button className="auth-button login-button" onClick={handleIniciarSesion}>
                            Iniciar sesión
                        </button>
                    </div>
                </div>

                <div className="categories-section"> {/* This section will no longer be absolutely positioned */}
                    <div className="category-grid">
                        <div className="category-item">
                            <span className="category-icon">🎩</span>
                        </div>
                        <div className="category-item">
                            <span className="category-icon">👗</span>
                        </div>
                        <div className="category-item">
                            <span className="category-icon">👠</span>
                        </div>
                        <div className="category-item">
                            <span className="category-icon">🧥</span>
                        </div>
                        <div className="category-item">
                            <span className="category-icon">👖</span>
                        </div>
                        <div className="category-item">
                            <span className="category-icon">👜</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;