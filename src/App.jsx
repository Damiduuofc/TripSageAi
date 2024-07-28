import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import Mostcountry from './components/custom/Mostcountry'
import Mostcities from './components/custom/Mostcities'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Hero/>
    <Mostcountry/>
    <Mostcities/>
      </>
  )
}

export default App
