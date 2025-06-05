import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'

function App() {
   return (
    <div className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights />
    </div>
  )
}

export default App
