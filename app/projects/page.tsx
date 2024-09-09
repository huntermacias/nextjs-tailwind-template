'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
// import { KanbanBoard } from "@/components/kanbanBoard";

type Props = {};

const ProjectPage = (props: Props) => {
  const pathname = usePathname();

  // Split the pathname into segments and filter out any empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="bg-[#191919] h-screen w-full p-4 z-50">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2 text-sm text-[#737373]">
          {/* Home Link */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-[#e2e2e2] hover:text-white">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dynamically generate the breadcrumb links */}
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");

            return (
              <span key={index} className="flex items-center space-x-2">
                <BreadcrumbSeparator className="text-[#737373]">
                  <ChevronRightIcon />
                </BreadcrumbSeparator>
                {index === pathSegments.length - 1 ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href} className="text-[#e2e2e2] hover:text-white">
                      {segment}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div>
      {/* <KanbanBoard /> */}
      </div>
    </div>
  );
};

export default ProjectPage;
