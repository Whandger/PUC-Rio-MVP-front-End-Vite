import Introducao from '../components/home/Introducao';
import FrequenciaCalendar from '../components/home/FrequenciaCalendar';
import Presenca from '../components/home/Presenca';
import TreinoSummary from '../components/home/TreinoSummary';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <Introducao />
      <FrequenciaCalendar />
      <Presenca />
      <TreinoSummary />
    </div>
  );
}