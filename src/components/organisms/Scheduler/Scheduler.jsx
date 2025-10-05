import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Scheduler.css'
import appointmentService from '../../../services/appointmentService'
import { useAuth } from '../../../context/AuthContext'

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
  timeGutterFormat: 'h:mm a',
}

// Función para convertir appointments de la API al formato del calendario
const convertAppointmentsToEvents = (appointments) => {
  if (!appointments || !Array.isArray(appointments)) {
    return []
  }

  return appointments.map((appointment) => {
    const startDate = new Date(appointment.date)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
    
    return {
      id: appointment.id,
      title: appointment.comments,
      start: startDate,
      end: endDate,
      email: appointment.email,
      type: appointment.type,
      comments: appointment.comments,
      location: appointment.location,
      createdAt: appointment.createdAt
    }
  })
}

function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventos, setEventos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [weekSummary, setWeekSummary] = useState(null)
  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && token) {
      loadAppointments()
    } else {
      setEventos([])
    }
  }, [currentDate, isAuthenticated, token])

  const loadAppointments = async () => {
    try {
      setIsLoading(true)
      
      const dateFrom = new Date(currentDate)
      dateFrom.setDate(currentDate.getDate() - currentDate.getDay() + 1)
      dateFrom.setHours(0, 0, 0, 0)
      
      const dateTo = new Date(dateFrom)
      dateTo.setDate(dateFrom.getDate() + 6)
      dateTo.setHours(23, 59, 59, 999)
      
      const { data } = await appointmentService.getAppointments(dateFrom, dateTo, token)
      
      if (data.success && data.data) {
        const events = convertAppointmentsToEvents(data.data.appointments || [])
        setEventos(events)
        
        // Traducir mensaje de la API
        const translatedMessage = data.message 
          ? data.message.replace('Found', 'Encontradas')
                        .replace('appointments', 'citas')
                        .replace('appointment', 'cita')
          : ''

        // Guardar resumen de la semana
        setWeekSummary({
          count: data.data.count || 0,
          message: translatedMessage,
          dateFrom: dateFrom,
          dateTo: dateTo
        })
      } else {
        setEventos([])
        setWeekSummary(null)
      }
    } catch (error) {
      console.error('Error al cargar appointments:', error)
      setEventos([])
      setWeekSummary(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectSlot = (slotInfo) => {
    console.log('Celda seleccionada:', slotInfo.start)
  }

  const handleSelectEvent = (event) => {
    console.log('Evento seleccionado:', event)
    const details = `
      Tipo: ${event.type}
      Comentarios: ${event.comments}
      Ubicación: ${event.location}
      Email: ${event.email}
      Fecha: ${event.start.toLocaleString('es-ES')}
    `
    alert(details)
  }

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Calendario de Citas</h2>
        </div>
        
        {weekSummary && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Resumen de la Semana
                </h3>
                <p className="text-blue-700">
                  {weekSummary.dateFrom.toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: 'short' 
                  })} - {weekSummary.dateTo.toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: 'short' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-900">
                  {weekSummary.count}
                </div>
                <div className="text-sm text-blue-600">
                  {weekSummary.count === 1 ? 'Cita' : 'Citas'}
                </div>
              </div>
            </div>
            {weekSummary.message && (
              <p className="text-sm text-blue-600 mt-2">
                {weekSummary.message}
              </p>
            )}
          </div>
        )}
      </div>
      
      {!isAuthenticated ? (
        <div className="h-[600px] bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Debes iniciar sesión para ver las citas</p>
            <p className="text-gray-500 text-sm mt-2">Usa el menú superior para acceder</p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="h-[600px] bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando citas...</p>
          </div>
        </div>
      ) : (
        <div className="h-[600px] bg-gray-50 rounded-lg p-4 border border-gray-200">
          <Calendar
            localizer={localizer}
            events={eventos}
            defaultView="week"
            views={['week']}
            step={30}
            timeslots={2}
            showMultiDayTimes
            min={new Date(2025, 0, 1, 7, 0, 0)}
            max={new Date(2025, 0, 1, 21, 0, 0)}
            culture="es"
            formats={formats}
            messages={{
              previous: 'Anterior',
              next: 'Siguiente', 
              today: 'Hoy'
            }}
            date={currentDate}
            onNavigate={handleNavigate}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

export default Scheduler