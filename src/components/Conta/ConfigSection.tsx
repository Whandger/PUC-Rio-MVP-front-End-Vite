export default function ConfigSection() {
  return (
    <div className="space-y-2">
      <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors">
        Alterar nome
      </button>
      <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors">
        Alterar senha
      </button>
      <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors">
        Alterar foto
      </button>
    </div>
  );
}