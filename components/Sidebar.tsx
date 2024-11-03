'use client';
import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const routes = [
  { href: "", label: "Home", icon: HomeIcon },
  { href: "workflows", label: "Workflows", icon: Layers2Icon },
  { href: "credentials", label: "Credentials", icon: ShieldCheckIcon },
  { href: "billing", label: "Billing", icon: CoinsIcon },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const activeRoute = routes.find(
    (route) => route.href && pathname.includes(route.href)
  ) || routes[0];

  return (
    <aside className='hidden md:block w-[280px] h-screen bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r border-separate'>
      <nav className="flex items-center justify-center border-b border-separate p-6">
        <Logo />
      </nav>
      <div className="text-sm p-4 text-center text-muted">CREDIT TODO</div>
      <div className="flex flex-col p-2 space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
            })}
          >
            <div className="flex items-center space-x-3 p-2 hover:bg-primary/10 rounded-md transition">
              <route.icon size={20} className="text-muted-foreground" />
              <span>{route.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export const MobileSidebar = () => {

  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();
  const activeRoute = routes.find(
    (route) => route.href && pathname.includes(route.href)
  ) || routes[0];

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-8'>
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sm:w-[540px] space-y-4'
          side={'left'}>
            <Logo />
            <div className='flex flex-col gap-1'>
            {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
            })}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="flex items-center space-x-3 p-2 hover:bg-primary/10 rounded-md transition">
              <route.icon size={20} className="text-muted-foreground" />
              <span>{route.label}</span>
            </div>
          </Link>
        ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>

    </div>
  )
}


