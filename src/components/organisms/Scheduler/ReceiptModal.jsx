import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import Button from '../../atoms/Button/Button'

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

function formatReceiptDate(date) {
  if (!date) return '—'
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function ReceiptModal({ open, onClose, event: evt }) {
  const receiptRef = useRef(null)

  if (!open || !evt) return null

  const typeLabel = TYPE_LABELS[evt.type] ?? evt.type ?? '—'
  const locationLabel = LOCATION_LABELS[evt.location] ?? evt.location ?? '—'
  const receiptNumber = evt.id ? String(evt.id).slice(-8).toUpperCase() : 'N/A'
  const today = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleExportPDF = async () => {
    const el = receiptRef.current
    if (!el) return
    try {
      const scale = 2
      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const imgW = canvas.width
      const imgH = canvas.height
      const ratio = Math.min(pdfW / imgW, pdfH / imgH) * 0.95
      const w = imgW * ratio
      const h = imgH * ratio
      pdf.addImage(imgData, 'PNG', (pdfW - w) / 2, (pdfH - h) / 2, w, h)
      const fileName = `Recibo-Cita-${evt.start ? new Date(evt.start).toISOString().slice(0, 10) : 'cita'}-${receiptNumber}.pdf`
      pdf.save(fileName)
    } catch (err) {
      console.error('Error al generar PDF:', err)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Comprobante de cita</h3>
          <div className="flex gap-2">
            <Button type="button" variant="primary" size="sm" onClick={handleExportPDF}>
              Exportar a PDF
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          <div
            ref={receiptRef}
            className="bg-white text-gray-900 mx-auto receipt-paper"
            style={{ width: '210mm', maxWidth: '100%', padding: '16px', fontFamily: 'system-ui, sans-serif' }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/logo.png"
                alt="Coro Adoradores"
                className="h-20 w-auto object-contain"
                crossOrigin="anonymous"
              />
            </div>

            <h1 className="text-center text-xl font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-2 mb-4">
              Comprobante de cita
            </h1>

            <p className="text-center text-sm text-gray-600 mb-1">{today}</p>
            <p className="text-center text-sm font-medium text-gray-700 mb-6">Nº de comprobante: {receiptNumber}</p>

            <div className="text-sm space-y-4 mb-6">
              <p className="leading-relaxed">
                Se hace constar que se ha registrado la siguiente cita solicitada para el servicio de coro.
              </p>

              <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-gray-50/50">
                <p className="font-semibold text-gray-800">Detalles de la cita</p>
                <ul className="space-y-1.5 text-gray-700">
                  <li><span className="font-medium">Fecha y hora:</span> {formatReceiptDate(evt.start)}</li>
                  <li><span className="font-medium">Tipo de evento:</span> {typeLabel}</li>
                  <li><span className="font-medium">Ubicación:</span> {locationLabel}</li>
                  <li><span className="font-medium">Estatus:</span> {evt.status ?? '—'}</li>
                  <li><span className="font-medium">Título / Descripción:</span> {evt.title || '—'}</li>
                  <li><span className="font-medium">Contacto:</span> {evt.email || '—'}</li>
                  {typeof evt.totalAmount === 'number' && (
                    <li><span className="font-medium">Costo total:</span> ${evt.totalAmount.toFixed(2)} MXN</li>
                  )}
                  {typeof evt.balanceDue === 'number' && (
                    <li><span className="font-medium">Saldo pendiente:</span> ${evt.balanceDue.toFixed(2)} MXN</li>
                  )}
                  {evt.comments && evt.comments !== evt.title && (
                    <li><span className="font-medium">Comentarios:</span> {evt.comments}</li>
                  )}
                </ul>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">Gracias por su preferencia.</p>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-500 mb-1">Receptor</p>
              <p className="font-semibold text-gray-800">Juan Carlos Calderon Castro</p>
              <p className="text-sm font-semibold text-gray-700">CORO ADORADORES</p>
            </div>

            <footer className="mt-8 pt-4 text-center text-xs text-gray-500 space-y-1">
              <p>www.coroadoradores.com</p>
              <p>Calle 47 Número 158, Floresta Residencial, Mérida, Yucatán</p>
              <p>999 497 6090 · jccc50@gmail.com</p>
              <p className="mt-3 italic">
                Este comprobante es válido como registro de cita y será utilizado para fines de organización y seguimiento.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptModal
