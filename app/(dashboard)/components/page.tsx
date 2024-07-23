'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const componentsList = [
  { title: 'Button', description: 'A customizable button component', href: '/components/Button', image: '/images/button.png' },
  { title: 'Card', description: 'A versatile card component', href: '/components/Card', image: '/images/card.png' },
  { title: 'Keyboard', description: 'A customizable keyboard component', href: '/components/Keyboard', image: '/images/keyboard.png'}
  // Add more components as needed
];

const ComponentsPage = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen text-white">
      <div className="container mx-auto py-16 mt-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Components</h1>
        <div className="pt-10 pb-0 fles justify-start max-w-7xl mx-auto relative z-40">
          <a target="__blank" className="bg-slate-900 group mb-8 cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
            href="https://discord.gg/ftZbQvCdN7">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <span>✨ Request a component</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.75 8.75L14.25 12L10.75 15.25"></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40">
            </span>
          </a>
        </div>
        <div className='pt-10 pb-0 justify-start max-w-7xl mx-auto relative z-40'>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 lg:gap-10 pb-40 items-start relative z-40">
          {componentsList.map((component, index) => (
            <div
              key={index}
              className="relative dark:border rounded-lg border-black/[0.1] dark:border-white/[0.1] overflow-hidden group-hover:shadow-xl transition duration-200"
              onClick={() => window.location.href = component.href}
            >
              <CardHeader className="flex flex-col items-start">
                <div className="relative rounded-lg  p-2 overflow-hidden group-hover:shadow-xl transition duration-200">
                  <img
                    src={component.image}
                    alt={`${component.title} preview`}
                    className="aspect-video-container rounded-xl"

                  />

                </div>
                <CardTitle className="text-xl font-bold mt-4 mb-2 dark:text-neutral-100 text-neutral-700">{component.title}</CardTitle>
                <CardDescription className="mt-2 text-sm font-normal dark:text-neutral-300 text-neutral-500">{component.description}</CardDescription>
              </CardHeader>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );

};

export default ComponentsPage;
