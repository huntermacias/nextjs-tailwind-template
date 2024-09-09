// components/Breadcrumbs.tsx
'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center space-x-2 text-sm text-[#737373] border-b border-[#373737]">
      <Link href="/" className="text-[#e2e2e2] hover:text-white">Home</Link>

      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");

        return (
          <span key={index} className="flex items-center space-x-2 ">
            <ChevronRightIcon className="text-[#737373]" />
            <Link href={href} className="text-[#e2e2e2] hover:text-white">
              {segment}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
