import ContaHeader from "../components/Conta/ContaHeader";
import SpacingLine from "../components/shared/SpacingLine";

export default function ContaPage() {
  return (
    // Div principal
    <div className="flex h-full flex-col text-gray-500">
      {/*header*/}
      <ContaHeader />
      {/* Contéudo */}
      <div className="flex flex-col items-center h-full w-full">
        <p>Alterar nome</p>
        <SpacingLine />
        <p>Alterar senha</p>
        <SpacingLine />
        <p>Alterar foto</p>
      </div>
    </div>
  );
}