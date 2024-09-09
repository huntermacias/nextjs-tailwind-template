'use client';
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="h-screen w-full bg-[#191919]">
        <div className="flex h-full">
          {/* Sidebar should be fixed on the left */}
          <Sidebar />

          {/* Main content area - allowing overflow and independent scrolling */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
