import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';


const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-600 to-slate-500 text-white p-6">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold animate-pulse">404</h1>
        <p className="text-2xl font-medium">Oops! Page not found</p>
        <p className="text-md text-gray-200 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/"
            className={buttonVariants({
              variant: 'default',
              className: 'px-6 py-3 mt-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105',
            })}
          >
            Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
