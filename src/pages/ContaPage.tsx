import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ContaHeader from "../components/Conta/ContaHeader";

export default function ContaPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Div principal
    <div className="flex h-full flex-col text-gray-500">
      {/*header*/}
      <ContaHeader />
      {/* Conteúdo */}
      <div className="flex flex-col items-center h-full w-full">
        <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors">
          Alterar nome
        </button>
        <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors">
          Alterar senha
        </button>
        <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors">
          Alterar foto
        </button>
        <button 
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors font-medium"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}