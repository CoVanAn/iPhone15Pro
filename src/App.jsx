import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'
import Model from './components/Model'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

function App() {
  return (
    <div className='bg-black h-screen'>
      <div className=' mx-auto text-white'>
        <Navbar />
        <Hero />
        <Highlights />
        <Model/>
        <Features />
        <HowItWorks />
        <Footer />
      </div>
    </div>
  )
}

export default App
