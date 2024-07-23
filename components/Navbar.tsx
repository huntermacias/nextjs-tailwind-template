import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { ModeToggle } from './ToggleTheme';

const Navbar = () => {
  return (
    <header className="z-[50] fixed top-0 w-full border-b bg-white dark:bg-black border-neutral-200 dark:border-white/[0.1]">
    <div className="container mx-auto flex items-center justify-between h-16 px-4">
      <a className="flex items-center space-x-2 text-2xl font-bold text-neutral-600 dark:text-gray-100" href="/">
        <div className="relative h-8 w-8 bg-black border border-slate-800 text-white flex items-center justify-center rounded-md">
          <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
          <div className="relative z-20">
            <img alt="Logo" src="/images/logo.webp" width="32" height="32" />
          </div>
        </div>
        <span>Aceternity UI</span>
      </a>
      <nav className="hidden lg:flex items-center space-x-6">
        <Link href="/components" className="text-neutral-600 dark:text-gray-100 transition-colors hover:text-foreground/80">Components</Link>
        <Link href="/templates" className="text-neutral-600 dark:text-gray-100 transition-colors hover:text-foreground/80 flex items-center">
          Templates
          <span className="ml-2 rounded-md bg-emerald-200 border border-emerald-400 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-500 px-1.5 py-0.5 text-xs leading-none">new</span>
        </Link>
        <Link href="/pricing" className="text-neutral-600 dark:text-gray-100 transition-colors hover:text-foreground/80">Pricing</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <a href="https://discord.gg/ftZbQvCdN7" target="__blank" className="text-neutral-600 dark:text-gray-100 transition-colors hover:text-foreground/80">
          <span className="hidden sm:block">Community</span>
          <svg className="h-4 w-4 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0m6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-1.5 5c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5L12 5.477a11.913 11.913 0 0 0-4.053 0L6.972 3.554C5.472 3.714 3.93 4.04 2.472 5.054c-2 5.667-2.167 9.833-1.5 11.5.667 1.333 2 3 3.5 3 .5 0 2-2 2-3m-2.5.5c3.5 1 6.5 1 10 0"></path></svg>
        </a>
        <a href="https://twitter.com/mannupaaji" target="__blank" className="text-neutral-600 dark:text-gray-100 transition-colors hover:text-foreground/80">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4l11.733 16h4.267L11.733 4H4zm0 16l6.768-6.768 2.46-2.46 6.772-6.772"></path></svg>
        </a>
        <ModeToggle />
        <button className="relative hidden sm:flex items-center py-2 px-4 rounded-xl bg-white dark:bg-black border dark:border-gray-600 text-muted-foreground dark:text-gray-100 border border-transparent shadow-md hover:text-foreground/80 transition-colors">
          <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 10m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0m11 11l-6-6"></path></svg>
          <span className="ml-2 text-gray-500 dark:text-gray-600">Search Components</span>
          <kbd className="pointer-events-none hidden sm:flex h-5 ml-3 items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
    </div>
  </header>
  );
};

export default Navbar;
