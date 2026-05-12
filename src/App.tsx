import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TreinoPage from './pages/TreinoPage';
import HistoricoPage from './pages/HistoricoPage';
import ContaPage from './pages/ContaPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/treino" element={<TreinoPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/conta" element={<ContaPage />} />
      </Route>
    </Routes>
  );
}

export default App;