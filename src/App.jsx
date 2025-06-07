import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'

function App() {
  return (
    <div className='bg-black h-screen'>
      <div className=' mx-auto text-white'>
        <Navbar />
        <Hero />
        <Highlights />
      </div>
    </div>
  )
}

export default App
