import BreadcrumbHeader from '@/components/breadcrumbHeader'
import { Sidebar } from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'

import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-1 min-h-screen'>
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>

          <BreadcrumbHeader />
          <div className='flex h-screen'>
            <ModeToggle />
          </div>
        </header>
        <Separator />
        <div className='overflow-auto'>
          <div className='flex-1 container py-4 text-accent-foreground'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout