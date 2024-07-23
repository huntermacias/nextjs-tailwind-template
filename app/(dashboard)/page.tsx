import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ToggleTheme';
import Keyboard from '@/components/Keyboard';

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function HomePage() {

  const data = await getData();
  //console.log('data', data);


  return (
    <div className="relative bg-white dark:bg-black min-h-screen text-black dark:text-white flex flex-col">
      {/* Navbar */}


      {/* Hero Section */}
      <section className="relative pb-40 bg-white dark:bg-black pt-20 md:pt-40 overflow-hidden px-2 md:px-4 lg:px-8">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 h-full w-full bg-white dark:bg-black">
          {/* Horizontal and vertical grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_3px,transparent_3px)] bg-[size:40px_40px]"></div>
          {/* Radial gradient with blur */}
          <div className="absolute inset-x-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="absolute z-[-10] h-full w-full bg-white dark:bg-black">
          {/* Radial grid */}
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="absolute inset-0 z-[-10] h-full w-full bg-white dark:bg-black">
          {/* Larger grid with radial gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:7rem_4rem]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        <div className="container mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Make your websites look 10x better</h1>
          <p className="text-lg mb-8">
            Copy paste the most trending components and use them in your websites without having to worry about styling and animations.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-shadow">Browse Components</button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-shadow">Custom Components</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto py-16">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex flex-col justify-start items-start'>
            <div className='mb-4'>
              <h2 className='text-5xl font-bold mb-2'>Make your websites look 10x better</h2>
              <div className='flex space-x-2'>
                {/* next.js icon */}
                <div className='flex items-center space-x-2'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1">
                      <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path>
                      <path d="M15 12v-3"></path>
                    </svg>
                  </span>
                  <span className='text-sm font-semibold text-neutral-500 flex-shrink-0'>Next.js</span>
                </div>

                {/* react icon */}
                <div className='flex items-center space-x-2'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1">
                      <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102"></path>
                      <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102"></path>
                      <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2"></path>
                      <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2"></path>
                      <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896"></path>
                      <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897"></path>
                      <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z"></path>
                    </svg>
                  </span>
                  <span className='text-sm font-semibold text-neutral-500 flex-shrink-0'>React.js</span>
                </div>

                {/* tailwind icon */}
                <div className='flex items-center space-x-2'>
                  <span>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-[0.5px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a4.72 4.72 0 0 0-5 4 3.23 3.23 0 0 1 3.5-1.49 4.32 4.32 0 0 1 1.91 1.35A5.77 5.77 0 0 0 17 12a4.72 4.72 0 0 0 5-4 3.2 3.2 0 0 1-3.5 1.51zm-13 4.98a4.22 4.22 0 0 1 1.91 1.34A5.77 5.77 0 0 0 12 18a4.72 4.72 0 0 0 5-4 3.23 3.23 0 0 1-3.5 1.49 4.32 4.32 0 0 1-1.91-1.35A5.8 5.8 0 0 0 7 12a4.72 4.72 0 0 0-5 4 3.2 3.2 0 0 1 3.5-1.51z"></path>
                    </svg>
                  </span>
                  <span className='text-sm font-semibold text-neutral-500 flex-shrink-0'>TailwindCSS</span>
                </div>

                {/* framer icon */}
                <div className='flex items-center space-x-2'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-10 md:w-10 h-4 w-4 text-neutral-500 flex-shrink-0 stroke-1">
                      <path d="M12 12l-8 -8v16l16 -16v16l-4 -4"></path>
                      <path d="M20 12l-8 8l-4 -4"></path>
                    </svg>
                  </span>
                  <span className='text-sm font-semibold text-neutral-500 flex-shrink-0'>Framer Motion</span>
                </div>
              </div>

            </div>
            <div className='mb-12'>
              <Keyboard />

            </div>
          </div>
          <div className='md:col-span-1'></div>
        </div>
        <footer className='text-white mt-10 text-5xl'>
          Footer
        </footer>
      </main>
    </div>
  );
}
