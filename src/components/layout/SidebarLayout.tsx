import Sidebar from '../Sidebar';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 dark:bg-black p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
