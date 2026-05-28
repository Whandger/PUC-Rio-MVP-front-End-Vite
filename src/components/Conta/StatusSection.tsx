import { useStatusData } from "../../hooks/useStatusData";
import BarChart from "../shared/BarChart";
import LineChart from "../shared/LineChart";

export default function StatusSection() {
  const {
    selectedYear,
    setSelectedYear,
    selectedMuscle,
    setSelectedMuscle,
    selectedExercise,
    setSelectedExercise,
    anosDisponiveis,
    totalTreinos,
    diasDoAno,
    percentualDiasTreinados,
    freqPorDia,
    musculos,
    exerciciosDoMusculo,
    pesoAoLongoTempo,
  } = useStatusData();

  return (
    <div className="space-y-6">
      {/* Filtro de ano */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
          <span className="material-icons text-lg">event</span>
          Filtrar por ano
        </label>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3588d4] transition"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Todos os anos</option>
          {anosDisponiveis.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      {/* Total de treinos */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-lg">bar_chart</span>
          Total de treinos realizados
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 mb-1">Treinos</p>
            <p className="text-2xl font-bold text-[#3588d4]">{totalTreinos}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Dias do ano</p>
            <p className="text-2xl font-bold text-[#3588d4]">
              {selectedYear ? diasDoAno : "–"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">% treinados</p>
            <p className="text-2xl font-bold text-[#3588d4]">
              {percentualDiasTreinados !== null
                ? `${percentualDiasTreinados}%`
                : "–"}
            </p>
          </div>
        </div>
      </div>

      {/* Frequência por dia da semana */}
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-lg">calendar_month</span>
          Frequência por dia da semana
        </h4>
        <BarChart data={freqPorDia} />
      </div>

      {/* Evolução de peso por exercício */}
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-lg">trending_up</span>
          Evolução de peso por exercício
        </h4>
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3588d4] transition"
          value={selectedMuscle}
          onChange={(e) => {
            setSelectedMuscle(e.target.value);
            setSelectedExercise("");
          }}
        >
          <option value="">Músculo</option> 
          {musculos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>


          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3588d4] transition"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="">Selecione um exercício</option>
            {exerciciosDoMusculo.map((ex) => (
              <option key={ex.jsonId} value={ex.jsonId}>
                {ex.nome}
              </option>
            ))}
          </select>


        {pesoAoLongoTempo.length > 1 && <LineChart data={pesoAoLongoTempo} />}
        {selectedExercise && pesoAoLongoTempo.length <= 1 && (
          <div className="text-center py-6 text-gray-400">
            <span className="material-icons text-3xl">inbox</span>
            <p className="text-sm mt-1">Sem dados suficientes para exibir evolução.</p>
          </div>
        )}
      </div>
    </div>
  );
}