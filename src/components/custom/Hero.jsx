import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent sm:text-5xl '>Find Your Next Adventure with AI: </span><br/>
        Tailor-Made Trips Just for You
      </h1>
      <div className='flex'>
      <p className='mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, crafting custom itineraries that fit your interests and budget.</p>
      </div>
        <Link to={'/create-trip'}>
        <Button>Get Started</Button>
        </Link>
    </div>
  )
}

export default Hero
