import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div className='hero min-h-screen text-white midnight'>
    <Navbar />
    <Routes>
      {/* Redirecting to specific page*/}
      <Route path='/' element={<Home />} />
      <Route path='/coin/:coinID' element={<Coin />} />
    </Routes>
    <Footer />
    </div>
  )
}

export default App
