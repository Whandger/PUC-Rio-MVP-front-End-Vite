import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}