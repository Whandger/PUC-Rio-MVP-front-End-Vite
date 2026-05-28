import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Accordion from "../components/shared/Accordion";
import ConfigSection from "../components/Conta/ConfigSection";
import StatusSection from "../components/Conta/StatusSection";

export default function ContaPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleToggle = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="flex h-full flex-col text-gray-500">
      <div className="flex flex-col flex-1">
        {/* Se nada está aberto, mostra os dois accordions fechados */}
        {openSection === null && (
          <>
            <Accordion
              title="Configurações"
              isOpen={false}
              onToggle={() => handleToggle("config")}
            >
              <ConfigSection />
            </Accordion>
            <Accordion
              title="Status"
              isOpen={false}
              onToggle={() => handleToggle("status")}
            >
              <StatusSection />
            </Accordion>
          </>
        )}

        {/* Se Configurações está aberto, só mostra ele */}
        {openSection === "config" && (
          <Accordion
            title="Configurações"
            isOpen={true}
            onToggle={() => handleToggle("config")}
          >
            <ConfigSection />
          </Accordion>
        )}

        {/* Se Status está aberto, só mostra ele */}
        {openSection === "status" && (
          <Accordion
            title="Status"
            isOpen={true}
            onToggle={() => handleToggle("status")}
          >
            <StatusSection />
          </Accordion>
        )}

        {/* Botão Sair da conta só aparece quando nada está aberto */}
        {openSection === null && (
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors font-medium mt-auto"
          >
            Sair da conta
          </button>
        )}
      </div>
    </div>
  );
}
