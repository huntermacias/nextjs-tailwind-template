import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
