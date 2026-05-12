import { NavLink } from 'react-router-dom';

const baseUrl = import.meta.env.BASE_URL;

const navItems = [
  { to: '/', label: '', icon: `${baseUrl}home.png` },
  { to: '/treino', label: '', icon: `${baseUrl}gymWeight.png` },
  { to: '/historico', label: '', icon: `${baseUrl}list.png` },
  { to: '/conta', label: '', icon: `${baseUrl}account.png` },
];


export default function Footer() {
  return (
    <footer className="bg-[#3588d4] w-full h-[8dvh] flex z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `w-1/4 h-full flex flex-col items-center justify-center transition-colors ${
              isActive ? 'bg-[#41a1eb]' : ''
            }`
          }
        >
          <span className="text-xl leading-none">
            {item.icon.endsWith('.png') ? (
              <img
                src={item.icon}
                alt={item.label}
                className="w-6 h-6"
              />
            ) : (
              item.icon
            )}
          </span>

          <span className="text-white text-[10px] mt-0.5">
            {item.label}
          </span>
        </NavLink>
      ))}
    </footer>
  );
}