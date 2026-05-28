interface Props {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

function toInputFormat(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return '';
}

function toDisplayFormat(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function HistoryFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  onClear,
}: Props) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-3 mb-2">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span className="font-medium shrink-0">Filtro:</span>
        <div className="flex items-center gap-1 flex-1">
          <span className="shrink-0">De</span>
          <input
            type="date"
            value={toInputFormat(startDate)}
            onChange={(e) => onStartDateChange(toDisplayFormat(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-1 flex-1">
          <span className="shrink-0">até</span>
          <input
            type="date"
            value={toInputFormat(endDate)}
            onChange={(e) => onEndDateChange(toDisplayFormat(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm flex-1 min-w-0"
          />
        </div>
      </div>

      {/* Linha inferior: botões Procurar e Todos */}
      <div className="flex justify-start gap-2 mt-2">
        <button
          onClick={onSearch}
          className="bg-[#3588d4] text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
        >
          Procurar
        </button>
        <button
          onClick={onClear}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition"
        >
          Todos
        </button>
      </div>
    </div>
  );
}