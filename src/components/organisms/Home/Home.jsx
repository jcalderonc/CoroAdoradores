import { useState, useEffect } from "react";
import Button from "../../atoms/Button/Button";
import ButtonGroup from "../../atoms/ButtonGroup/ButtonGroup";
import { openChoirWhatsApp } from "../../../utils/whatsapp";
import "./Home.css";

const Home = ({ onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    { src: "/images/frente.png", alt: "Coro Adoradores en presentación" },
    { src: "/images/piano.png", alt: "Piano del coro" },
    { src: "/images/instrumentos.png", alt: "Instrumentos musicales" },
    { src: "/images/mixer.png", alt: "Mesa de mezclas" },
    { src: "/images/bocinas.png", alt: "Sistema de sonido" },
  ];

  // WhatsApp contact function
  const handleWhatsAppContact = () => {
    openChoirWhatsApp();
  };

  // Navigate to hiring process page
  const handleHiringPage = () => {
    if (onNavigate) {
      onNavigate("Contrataciones");
    }
  };

  // Navigate to masses page
  const handleViewRehearsals = () => {
    if (onNavigate) {
      onNavigate("Misas");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">
            Unidos en adoración, conectados por la música
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            shape="pill"
            className="cta-button"
            onClick={handleHiringPage}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Contratar
          </Button>
        </div>
        <div className="hero-image">
          <div className="gallery-container">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`gallery-image ${
                  index === currentImageIndex ? "active" : ""
                }`}
              />
            ))}
          </div>
          <div className="gallery-indicators">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>Nuestra Pasión por la Música</h2>
          <p>
            Somos un coro dedicado a la adoración a través de la música. Te
            brindamos el servicio de acompañamiento en tus eventos religiosos,
            combinando voces, instrumentos y tecnología para crear experiencias
            únicas y transformadoras.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="instruments">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="instruments-grid">
            <div className="instrument-card">
              <img src="/images/boda.png" alt="Servicio para bodas" />
              <h3>Bodas</h3>
              <p>Acompañamiento musical para ceremonias y celebraciones.</p>
            </div>
            <div className="instrument-card">
              <img src="/images/quince.png" alt="Servicio para XV años" />
              <h3>XV años</h3>
              <p>Música especial para una celebración inolvidable.</p>
            </div>
            <div className="instrument-card">
              <img src="/images/novena.png" alt="Servicio para novenas" />
              <h3>Novenas</h3>
              <p>Ambientación de oración y recogimiento con música en vivo.</p>
            </div>
            <div className="instrument-card">
              <img src="/images/cena.png" alt="Ambientación para cena" />
              <h3>Ambientación para una cena</h3>
              <p>
                Repertorio suave y elegante para crear un ambiente agradable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Tienes un evento? Contrata ahora</h2>
          <p>
            Agenda tu cita y prepara una presentación especial para tu celebración
          </p>
          <ButtonGroup spacing="lg" className="cta-buttons">
            <Button 
              variant="primary" 
              size="lg" 
              shape="pill"
              className="btn-primary"
              onClick={handleHiringPage}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Contratar
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              shape="pill"
              className="btn-secondary"
              onClick={handleViewRehearsals}
            >
              Ver misas
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
};

export default Home;
