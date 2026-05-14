import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col lg:flex-row h-dvh overflow-hidden font-sans">
      {/* Header - visível apenas no mobile */}
      <div className="lg:hidden">
        <Header />
      </div>
      
      {/* Container principal */}
      <div className="flex flex-1 overflow-hidden lg:flex-row flex-col">
        {/* Footer - aparece na esquerda no desktop e é escondido no celular */}
        <div className="hidden lg:flex">
          <Footer />
        </div>
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
      
      {/* Footer - visível apenas no mobile (embaixo) */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
}