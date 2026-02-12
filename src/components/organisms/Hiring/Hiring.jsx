import Button from "../../atoms/Button/Button";
import { openChoirWhatsApp } from "../../../utils/whatsapp";

const steps = [
  {
    title: "1. Cuéntanos tu evento",
    description:
      "Compártenos la fecha, horario, ubicación y tipo de celebración para entender tu necesidad.",
  },
  {
    title: "2. Agenda tu fecha",
    description:
      "Para agendar tu propia cita en la página, primero debes registrarte. Si lo prefieres, también puedes solicitarla por WhatsApp.",
  },
  {
    title: "3. Confirma tu cita",
    description:
      "Para asegurar tu fecha, la cita se confirma mediante un anticipo.",
  },
];

const Hiring = ({ onNavigate }) => {
  const handleBackHome = () => {
    if (onNavigate) {
      onNavigate("Home");
    }
  };

  return (
    <section className="pt-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Proceso para agendar una cita
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Te acompañamos paso a paso para contratar al coro y preparar una
          presentación acorde a tu evento.
        </p>

        <div className="space-y-4 mb-10">
          {steps.map((step) => (
            <article
              key={step.title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h2>
              <p className="text-gray-700">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg" shape="pill" onClick={openChoirWhatsApp}>
            Agendar por WhatsApp
          </Button>
          <Button variant="secondary" size="lg" shape="pill" onClick={handleBackHome}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hiring;
