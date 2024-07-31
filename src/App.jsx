import { useState } from 'react';
import './App.css';
import Hero from './components/custom/Hero';
import Mostcountry from './components/custom/Mostcountry';
import Mostcities from './components/custom/Mostcities';
import RetroGrid from './components/magicui/retro-grid';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <RetroGrid className="bg-layer" />
      <div className="content">
        <Hero />
        <Mostcountry />
        <Mostcities />
      </div>
    </div>
  );
}

export default App;
