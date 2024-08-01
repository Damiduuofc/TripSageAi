import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import BlurIn from "../magicui/blur-in";

function Hero() {
  return (
    <div className='flex flex-col items-center mx-4 sm:mx-56 gap-4 sm:gap-9 mt-14'>

      <BlurIn 
        word={<>
          <span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent text-3xl sm:text-5xl mt-10'>
            Find Your Next Adventure with AI:
          </span><br/>
          <span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent text-xl sm:text-3xl'>
            Tailor-Made Trips Just for You
          </span>
        </>}
        duration={1.5} 
        className='mt-8 sm:mt-16'
      />
      <div className='flex'>
        <p className='mx-auto mt-4 max-w-xs sm:max-w-xl text-base sm:text-xl text-gray-500 text-center'>
          Your personal trip planner and travel curator, crafting custom itineraries that fit your interests and budget.
        </p>
      </div>
      <Link to={'/create-trip'}>
        <Button className='text-sm sm:text-base'>Get Started</Button>
      </Link>
    </div>
  );
}

export default Hero;
