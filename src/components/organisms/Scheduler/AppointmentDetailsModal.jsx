import { useState } from 'react'
import Button from '../../atoms/Button/Button'
import ReceiptModal from './ReceiptModal'
import appointmentService from '../../../services/appointmentService'
import { useToast } from '../../../context/ToastContext'

const TYPE_LABELS = {
  xv_anos: 'XV años',
  boda: 'Boda',
  primera_comunion: 'Primera comunión',
  confirmacion: 'Confirmación',
  accion_de_gracias: 'Acción de gracias',
  otro: 'Otro',
}

const LOCATION_LABELS = {
  parroquia_san_rafael: 'Parroquia San Rafael',
  capilla_nuestra_senora_del_carmen: 'Capilla Nuestra Señora Del Carmen',
}

function formatDateTime(date) {
  if (!date) return '—'
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function AppointmentDetailsModal({ open, onClose, event: evt, token, onDeleted }) {
  const [showReceipt, setShowReceipt] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const toast = useToast()

  if (!open || !evt) return null

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar esta cita? Esta acción no se puede deshacer.')) return
    if (!evt.id || !token) return
    setDeleting(true)
    try {
      await appointmentService.deleteAppointment(evt.id, token)
      toast.success('Cita eliminada correctamente.')
      onDeleted?.()
      onClose()
    } catch (err) {
      toast.error(err.data?.message || err.message || 'Error al eliminar la cita.')
    } finally {
      setDeleting(false)
    }
  }

  const typeLabel = TYPE_LABELS[evt.type] ?? evt.type ?? '—'
  const locationLabel = LOCATION_LABELS[evt.location] ?? evt.location ?? '—'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
          Detalle de la cita
        </h3>

        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Título / Comentarios</dt>
            <dd className="text-gray-900">{evt.title || '—'}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Fecha y hora</dt>
            <dd className="text-gray-900">{formatDateTime(evt.start)}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Tipo</dt>
            <dd className="text-gray-900">{typeLabel}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Ubicación</dt>
            <dd className="text-gray-900">{locationLabel}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Email</dt>
            <dd className="text-gray-900 break-all">{evt.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Estatus</dt>
            <dd className="text-gray-900">{evt.status ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Costo total (MXN)</dt>
            <dd className="text-gray-900">
              {typeof evt.totalAmount === 'number' ? `$${evt.totalAmount.toFixed(2)}` : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 font-medium mb-0.5">Saldo pendiente (MXN)</dt>
            <dd className="text-gray-900">
              {typeof evt.balanceDue === 'number' ? `$${evt.balanceDue.toFixed(2)}` : '—'}
            </dd>
          </div>
          {evt.comments && evt.comments !== evt.title && (
            <div>
              <dt className="text-gray-500 font-medium mb-0.5">Comentarios adicionales</dt>
              <dd className="text-gray-900">{evt.comments}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
          <Button type="button" variant="primary" onClick={() => setShowReceipt(true)}>
            Ver recibo
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            loading={deleting}
            disabled={deleting}
          >
            Eliminar
          </Button>
        </div>
      </div>

      <ReceiptModal
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        event={evt}
      />
    </div>
  )
}

export default AppointmentDetailsModal
