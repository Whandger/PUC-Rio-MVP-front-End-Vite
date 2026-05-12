import SpacingLine from "../shared/SpacingLine";

export default function ContaHeader() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      {/* Div header */}
      <div className="w-full py-2 flex">
        {/* Header configurações */}
        <div className="h-full w-[85%] flex items-center px-10">
          <p className="font-bold text-[#2686cf]">CONFIGURAÇÕES</p>
        </div>
        <div className="h-full w-[15%] rounded-full flex items-center justify-center">
          <div className="rounded-full flex items-center border-[#2686cf] border-2 justify-center h-12 w-12 bg-blue-200 overflow-hidden">
            <img
              className="w-8 h-8"
              src={`${baseUrl}account.png`}
              alt="foto de usuario"
            />
          </div>
        </div>
      </div>
      <SpacingLine />
    </>
  );
}
