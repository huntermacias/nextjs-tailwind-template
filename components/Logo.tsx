import { cn } from '@/lib/utils';
import { icons, SquareDashedMousePointer } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Logo = ({ fontSize = "2xl", iconSize = 20 } : {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <Link href="/" className={cn("text-2xl  font-extrabold  flex items-center gap-2",
      fontSize
    )}>
      <div className='rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2'>
        <SquareDashedMousePointer
          size={iconSize}
          className='stroke-white'
        />
      </div>
      <div>
        <span className='bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent'>
          Ping
        </span>
        <span className='bg-gradient-to-r from-stone-500 to-stone-600 bg-clip-text text-transparent'>
          Panda
        </span>
      </div>
    </Link>
  )
}

export default Logo