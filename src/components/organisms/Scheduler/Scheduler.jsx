import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Scheduler.css'
import appointmentService from '../../../services/appointmentService'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'
import Button from '../../atoms/Button/Button'
import NewAppointmentModal from './NewAppointmentModal'
import AppointmentDetailsModal from './AppointmentDetailsModal'

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

const getDefaultFormDate = () => new Date().toISOString().slice(0, 16)
const initialFormState = {
  email: '',
  dateTime: getDefaultFormDate(),
  type: 'xv_anos',
  comments: '',
  location: '',
  status: 'Tentativo',
  totalAmount: '',
  balanceDue: '',
}

// Función para convertir appointments de la API al formato del calendario
const convertAppointmentsToEvents = (appointments) => {
  if (!appointments || !Array.isArray(appointments)) {
    return []
  }

  return appointments.map((appointment) => {
    // Parsear la fecha como UTC (la API guarda en UTC). Así el calendario la muestra bien en hora local.
    const dateStr = appointment.date.endsWith('Z') || /\+\d{2}:?\d{2}$/.test(appointment.date)
      ? appointment.date
      : appointment.date + 'Z'
    const startDate = new Date(dateStr)
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
      status: appointment.status ?? 'Tentativo',
      totalAmount: typeof appointment.totalAmount === 'number' ? appointment.totalAmount : 0,
      balanceDue: typeof appointment.balanceDue === 'number' ? appointment.balanceDue : 0,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }
  })
}

function Scheduler() {
  // Inicializar en la semana actual
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [eventos, setEventos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [weekSummary, setWeekSummary] = useState(null)
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const { token, isAuthenticated } = useAuth()
  const toast = useToast()

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
    setSelectedEvent(event)
  }

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate)
  }

  const openNewAppointmentModal = () => {
    if (!isAuthenticated) {
      toast.warning('Inicia sesión para crear una cita.')
      return
    }
    setFormData({ ...initialFormState, dateTime: getDefaultFormDate() })
    setShowNewAppointmentModal(true)
  }

  const closeNewAppointmentModal = () => setShowNewAppointmentModal(false)

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateAppointment = async (e) => {
    e.preventDefault()
    const { email, dateTime, type, comments, location, status, totalAmount, balanceDue } = formData
    if (!email?.trim()) {
      toast.warning('El correo electrónico es requerido.')
      return
    }
    if (!type?.trim()) {
      toast.warning('El tipo de cita es requerido.')
      return
    }
    const dateISO = new Date(dateTime).toISOString()
    const total = totalAmount === '' || totalAmount == null ? undefined : Number(totalAmount)
    const balance = balanceDue === '' || balanceDue == null ? undefined : Number(balanceDue)
    setSubmitting(true)
    try {
      await appointmentService.createAppointment(
        {
          email: email.trim(),
          date: dateISO,
          type: type.trim(),
          comments: (comments || '').trim(),
          location: (location || '').trim(),
          status: status || 'Tentativo',
          totalAmount: typeof total === 'number' && !Number.isNaN(total) ? total : undefined,
          balanceDue: typeof balance === 'number' && !Number.isNaN(balance) ? balance : undefined,
        },
        token
      )
      toast.success('Cita creada correctamente.')
      closeNewAppointmentModal()
      loadAppointments()
    } catch (err) {
      toast.error(err.data?.message || err.message || 'Error al crear la cita.')
    } finally {
      setSubmitting(false)
    }
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
            <div className="mt-4 pt-3 border-t border-blue-200">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={openNewAppointmentModal}
              >
                Programar nueva cita
              </Button>
            </div>
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
          {(() => {
            // Configurar min/max para las horas del día (7 AM - 9 PM)
            const minTime = new Date(2025, 0, 1, 7, 0, 0)  // 7:00 AM
            const maxTime = new Date(2025, 0, 1, 21, 0, 0) // 9:00 PM
            
            console.log('📅 Configuración del calendario:', {
              currentDate: currentDate.toISOString(),
              minTime: minTime.toISOString(),
              maxTime: maxTime.toISOString(),
              eventosCount: eventos.length,
              eventos: eventos.map(e => ({
                title: e.title,
                start: e.start.toISOString(),
                end: e.end.toISOString()
              }))
            })
            
            return (
              <Calendar
                localizer={localizer}
                events={eventos}
                defaultView="week"
                views={['week']}
                step={30}
                timeslots={2}
                showMultiDayTimes
                min={minTime}
                max={maxTime}
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
            )
          })()}
        </div>
      )}

      <NewAppointmentModal
        open={showNewAppointmentModal}
        onClose={closeNewAppointmentModal}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleCreateAppointment}
        submitting={submitting}
      />

      <AppointmentDetailsModal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        token={token}
        onDeleted={() => {
          setSelectedEvent(null)
          loadAppointments()
        }}
      />
    </div>
  )
}

export default Scheduler