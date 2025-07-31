import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Scheduler.css'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'es': es,
  },
})
const formats = {
  timeGutterFormat: 'h:mm a', // ← Solo esta línea para AM/PM
}

const eventos = [
  // ... todos tus eventos existentes ...
  {
    id: 1,
    title: 'Boda - María y Juan Pérez',
    start: new Date(2025, 6, 28, 16, 0),
    end: new Date(2025, 6, 28, 18, 0),
  },
  // ... resto de eventos ...
  {
    id: 7,
    title: 'Boda - Pedro y Ana',
    start: new Date(2025, 7, 10, 15, 0),
    end: new Date(2025, 7, 10, 17, 0),
  },
  {
    id: 8,
    title: 'Quinceañera - Isabella',
    start: new Date(2025, 7, 17, 18, 0),
    end: new Date(2025, 7, 17, 20, 0),
  }
]

function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date()) // ← Agregar estado

  const handleSelectSlot = (slotInfo) => {
    console.log('Celda seleccionada:', slotInfo.start)
  }

  const handleSelectEvent = (event) => {
    console.log('Evento seleccionado:', event)
  }

  const handleNavigate = (newDate) => { // ← Agregar handler
    setCurrentDate(newDate)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Calendario de Citas</h2>
      </div>
      
      <div className="h-[600px] bg-gray-50 rounded-lg p-4 border border-gray-200">
        <Calendar
          localizer={localizer}
          events={eventos}
          defaultView="week"
          views={['week']}
          step={60}
          showMultiDayTimes
          culture="es" 
          formats={formats}
          messages={{
            previous: 'Anterior',
            next: 'Siguiente', 
            today: 'Hoy'
          }}
          date={currentDate}           // ← Agregar fecha controlada
          onNavigate={handleNavigate}  // ← Agregar handler de navegación
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          className="rounded-lg"
        />
      </div>
    </div>
  )
}

export default Scheduler