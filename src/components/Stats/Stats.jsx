import StatCard from './StatCard'

function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Citas esta semana" 
        count={6} 
        icon="📅"
      />
      <StatCard 
        title="Bodas programadas" 
        count={3} 
        icon="💒"
      />
      <StatCard 
        title="Eventos pendientes" 
        count={2} 
        icon="⏳"
      />
      <StatCard 
        title="Horas disponibles" 
        count={24} 
        icon="🕐"
      />
    </div>
  )
}

export default Stats