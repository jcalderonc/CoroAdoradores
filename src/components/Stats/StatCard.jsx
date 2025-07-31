function StatCard(props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-400">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{props.title}</p>
          <p className="text-3xl font-bold text-gray-900">{props.count}</p>
        </div>
        <div className="text-4xl">
          {props.icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard