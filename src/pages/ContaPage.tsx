import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ContaHeader from "../components/Conta/ContaHeader";
import Accordion from "../components/shared/Accordion";
import ConfigSection from "../components/Conta/ConfigSection";
import StatusSection from "../components/Conta/StatusSection";

export default function ContaPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col text-gray-500">
      <ContaHeader />

      <div className="flex flex-col flex-1">
        <Accordion title="Configurações">
          <ConfigSection />
        </Accordion>

        <Accordion title="Status">
          <StatusSection />
        </Accordion>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors font-medium mt-auto"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}