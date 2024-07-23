import React from 'react';
import Button  from './Button';
import Card, { CardContent, CardFooter, CardHeader } from './Card';
import Image from 'next/image';
import Link from 'next/link';


const ComponentWrapper: React.FC<{ component: string }> = ({ component }) => {
  switch (component) {
    case 'Button':
      return (
        <div className='w-full border border-gray-300/20 rounded-md faint-grid-background items-center flex justify-center p-6'>
          <Button label="Preview Button" onClick={() => {}} />;
        </div>
      )
      case 'Card':
        return (
          <div  className='w-full border border-gray-300/20 rounded-md faint-grid-background items-center flex justify-center p-6'>
            <Card title="Advanced CSS Magic" description="Experience the elegance of modern web design with this advanced card component.">
              <CardHeader>
                <div className="text-xl text-white">Breaking News: The Power of CSS</div>
              </CardHeader>
              <CardContent>
                <p className="text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.</p>
                <div className="mt-4 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center mt-6">
                  <Link href="https://twitter.com/huntermacias_" target="__blank" className="px-4 py-2 rounded-lg text-xs font-normal text-white bg-indigo-600">
                    Follow me →
                  </Link>
                  <button className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold">
                    Sign up
                  </button>
                </div>
              </CardFooter>
            </Card>

          </div>
        );
    default:
      return null;
  }
};

export default ComponentWrapper;
