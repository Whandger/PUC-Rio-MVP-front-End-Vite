import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import TreinoPage from './pages/TreinoPage';
import HistoricoPage from './pages/HistoricoPage';
import ContaPage from './pages/ContaPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rota pública */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        
        {/* Rotas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/treino" element={
          <ProtectedRoute>
            <TreinoPage />
          </ProtectedRoute>
        } />
        <Route path="/historico" element={
          <ProtectedRoute>
            <HistoricoPage />
          </ProtectedRoute>
        } />
        <Route path="/conta" element={
          <ProtectedRoute>
            <ContaPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;