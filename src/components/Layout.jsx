import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Toast from './Toast';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fb] dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
}
