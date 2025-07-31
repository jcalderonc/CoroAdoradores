import Header from './components/Header/Header'
import Scheduler from './components/Scheduler/Scheduler'
import Stats from './components/Stats/Stats'
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          
           <Stats />
           <Scheduler />
        </div>
      </main>
    </div>
  )
}

export default App