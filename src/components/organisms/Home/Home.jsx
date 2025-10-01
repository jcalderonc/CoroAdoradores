import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    { src: "/src/assets/frente.png", alt: "Coro Adoradores en presentación" },
    { src: "/src/assets/piano.png", alt: "Piano del coro" },
    { src: "/src/assets/instrumentos.png", alt: "Instrumentos musicales" },
    { src: "/src/assets/mixer.png", alt: "Mesa de mezclas" },
    { src: "/src/assets/bocinas.png", alt: "Sistema de sonido" },
  ];

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
          <button className="cta-button">Únete a nosotros</button>
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
              <img src="/src/assets/piano.png" alt="Piano" />
              <h3>Piano</h3>
              <p>El corazón melódico de nuestras alabanzas</p>
            </div>
            <div className="instrument-card">
              <img
                src="/src/assets/instrumentos.png"
                alt="Instrumentos diversos"
              />
              <h3>Instrumentos</h3>
              <p>Una variedad de instrumentos que enriquecen nuestra música</p>
            </div>
            <div className="instrument-card">
              <img src="/src/assets/mixer.png" alt="Mesa de mezclas" />
              <h3>Producción</h3>
              <p>Tecnología profesional para el mejor sonido</p>
            </div>
            <div className="instrument-card">
              <img src="/src/assets/bocinas.png" alt="Sistema de sonido" />
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
          <div className="cta-buttons">
            <button className="btn-primary">Contáctanos</button>
            <button className="btn-secondary">Ver ensayos</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
