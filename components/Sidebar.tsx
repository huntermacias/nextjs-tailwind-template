'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const components = [
  'Button',
  'Card',
  'Keyboard'
];

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <div className="w-64 sidebar h-screen bg-white dark:bg-black text-black dark:text-white px-6 fixed top-0 left-0 pt-20 overflow-auto">
      <nav>
        <ul className="space-y-8">
          <li>
            <h3 className="mt-6 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">Follow for updates</h3>
            <p className="group ml-4 flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-emerald-500
                            hover:translate-x-1 transition duration-100 text-gray-500 dark:text-gray-400">
              Twitter @huntermacias
            </p>
          </li>
          <li>
            <h3 className="rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">Installation</h3>
            <ul className="ml-4 space-y-1.5 text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/install-nextjs" className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-emerald-500
                            hover:translate-x-1 transition duration-100 text-gray-500 dark:text-gray-400">
                  Install Next.js
                </Link>
              </li>
              <li>
                <Link href="/install-tailwind" className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-emerald-500
                            hover:translate-x-1 transition duration-100 text-gray-500 dark:text-gray-400">
                  Install Tailwind CSS
                </Link>
              </li>
              <li>
                <Link href="/add-utilities" className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-emerald-500
                            hover:translate-x-1 transition duration-100 text-gray-500 dark:text-gray-400">
                  Add utilities
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <h3 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">All Components</h3>
            <ul className="ml-4 space-y-1">
              {components.map((component, index) => (
                <li key={index}>
                  <Link href={`/components/${component.replace(/\s+/g, '-')}`}
                  className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-emerald-500 hover:dark:hover:text-emerald-500
                            hover:translate-x-1 transition duration-100 text-gray-500 dark:text-gray-400">
                    {component}
                    {component.includes('New') && (
                      <span className="ml-2 rounded-md bg-emerald-200 border border-emerald-400 text-emerald-700
                                      bg-emerald-300/10 text-emerald-500 px-1.5 py-0.5 text-xs leading-none
                                    no-underline group-hover:no-underline">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
