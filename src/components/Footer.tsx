import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '', icon: '/home.png' },
  { to: '/treino', label: '', icon: '/gymWeight.png' },
  { to: '/historico', label: '', icon: '/list.png' },
  { to: '/conta', label: '', icon: '/account.png' },
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