import React, { useState, useEffect } from "react";
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

  // Navigate to rehearsals page
  const handleViewRehearsals = () => {
    if (onNavigate) {
      onNavigate("Ensayos");
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
          <h1 className="hero-title">Coro Adoradores</h1>
          <p className="hero-subtitle">
            Unidos en adoración, conectados por la música
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            shape="pill"
            className="cta-button"
            onClick={handleWhatsAppContact}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Únete a nosotros
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
            Somos un coro dedicado a la adoración a través de la música.
            Combinamos voces, instrumentos y tecnología para crear experiencias
            de adoración únicas y transformadoras.
          </p>
        </div>
      </section>

      {/* Instruments Section */}
      <section className="instruments">
        <div className="container">
          <h2>Nuestros Instrumentos</h2>
          <div className="instruments-grid">
            <div className="instrument-card">
              <img src="/images/piano.png" alt="Piano" />
              <h3>Piano</h3>
              <p>El corazón melódico de nuestras alabanzas</p>
            </div>
            <div className="instrument-card">
              <img src="/images/instrumentos.png" alt="Instrumentos diversos" />
              <h3>Instrumentos</h3>
              <p>Una variedad de instrumentos que enriquecen nuestra música</p>
            </div>
            <div className="instrument-card">
              <img src="/images/mixer.png" alt="Mesa de mezclas" />
              <h3>Producción</h3>
              <p>Tecnología profesional para el mejor sonido</p>
            </div>
            <div className="instrument-card">
              <img src="/images/bocinas.png" alt="Sistema de sonido" />
              <h3>Sonido</h3>
              <p>Sistema de audio de alta calidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>¿Quieres formar parte del coro?</h2>
          <p>
            Únete a nuestra familia musical y comparte tu talento en adoración
          </p>
          <ButtonGroup spacing="lg" className="cta-buttons">
            <Button 
              variant="primary" 
              size="lg" 
              shape="pill"
              className="btn-primary"
              onClick={handleWhatsAppContact}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Contáctanos
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              shape="pill"
              className="btn-secondary"
              onClick={handleViewRehearsals}
            >
              Ver ensayos
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
};

export default Home;
