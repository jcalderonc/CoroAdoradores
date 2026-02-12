import Button from '../../atoms/Button/Button'

const APPOINTMENT_TYPES = [
  { value: 'xv_anos', label: 'XV años' },
  { value: 'boda', label: 'Boda' },
  { value: 'primera_comunion', label: 'Primera comunión' },
  { value: 'confirmacion', label: 'Confirmación' },
  { value: 'accion_de_gracias', label: 'Acción de gracias' },
  { value: 'otro', label: 'Otro' },
]

const LOCATIONS = [
  { value: 'parroquia_san_rafael', label: 'Parroquia San Rafael' },
  { value: 'capilla_nuestra_senora_del_carmen', label: 'Capilla Nuestra Señora Del Carmen' },
]

const STATUS_OPTIONS = [
  { value: 'Tentativo', label: 'Tentativo' },
  { value: 'Confirmado', label: 'Confirmado' },
  { value: 'Completado', label: 'Completado' },
]

function NewAppointmentModal({ open, onClose, formData, onFormChange, onSubmit, submitting }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Nueva cita</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora *</label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => onFormChange('dateTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <select
              value={formData.type}
              onChange={(e) => onFormChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              required
            >
              {APPOINTMENT_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
            <textarea
              value={formData.comments}
              onChange={(e) => onFormChange('comments', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              rows={2}
              placeholder="Notas opcionales"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación *</label>
            <select
              value={formData.location}
              onChange={(e) => onFormChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Selecciona ubicación</option>
              {LOCATIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estatus</label>
            <select
              value={formData.status ?? 'Tentativo'}
              onChange={(e) => onFormChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Costo total (MXN)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.totalAmount ?? ''}
                onChange={(e) => onFormChange('totalAmount', e.target.value === '' ? '' : e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Saldo pendiente (MXN)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.balanceDue ?? ''}
                onChange={(e) => onFormChange('balanceDue', e.target.value === '' ? '' : e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={submitting} disabled={submitting} className="flex-1">
              Crear cita
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewAppointmentModal
