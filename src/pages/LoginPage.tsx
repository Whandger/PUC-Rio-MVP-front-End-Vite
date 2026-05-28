import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, register, forgotPassword } = useAuth();
  const navigate = useNavigate();
  
  // Estados do formulário de login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Estados do modal de registro
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  // Estados do modal de recuperação
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Estados de feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(loginUsername, loginPassword);
    if (result) {
      navigate('/');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await register(registerEmail, registerUsername, registerPassword);
    if (result) {
      setSuccess('Registro realizado com sucesso!');
      setShowRegister(false);
      navigate('/');
    } else {
      setError('Usuário ou email já cadastrado');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await forgotPassword(forgotEmail);
    if (result) {
      setSuccess('Email de recuperação enviado!');
      setShowForgot(false);
    } else {
      setError('Email não encontrado');
    }
  };

  return (
    <div className="min-h-screen bg-[#58a7e5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/buried.png")'
        }}
      />
      
      {/* SVG Wave no footer */}
      <div className="absolute bottom-0 left-0 right-0 h-64">
        <svg 
          className="absolute bottom-0 w-full" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="0.3" 
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Container do Login */}
      <div className="relative z-10 w-full max-w-md">
        {/* Tela de Login */}
        {!showRegister && !showForgot && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#58a7e5]">
              LOGIN
            </h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Coloque seu login"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Coloque sua senha"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    style={{ accentColor: '#58a7e5' }}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 h-4 w-4 text-[#58a7e5] focus:ring-[#58a7e5] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">Lembrar-se de mim</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-[#58a7e5] hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#58a7e5] text-white font-bold py-3 rounded-lg hover:bg-[#2686cf] transition-colors mb-4"
              >
                LOGIN
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="text-sm text-gray-600 hover:text-[#58a7e5]"
                >
                  Não tem uma conta? <span className="text-[#58a7e5] font-semibold">Registre-se</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal de Registro */}
        {showRegister && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#58a7e5]">
              REGISTER
            </h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário
                </label>
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Digite o nome de usuário"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#58a7e5] text-white font-bold py-3 rounded-lg hover:bg-[#2686cf] transition-colors mb-4"
              >
                REGISTER
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowRegister(false);
                    setError('');
                  }}
                  className="text-sm text-gray-600 hover:text-[#58a7e5]"
                >
                  Voltar para o Login
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal de Recuperação de Senha */}
        {showForgot && (
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#58a7e5]">
              RECOVER ACCOUNT
            </h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {success}
              </div>
            )}
            
            <form onSubmit={handleForgotPassword}>
              <div className="mb-6">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border-b-2 border-[#58a7e5] py-2 px-1 focus:outline-none focus:border-[#2686cf]"
                  placeholder="Email"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#58a7e5] text-white font-bold py-3 rounded-lg hover:bg-[#2686cf] transition-colors mb-4"
              >
                SEND EMAIL
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-sm text-gray-600 hover:text-[#58a7e5]"
                >
                  Voltar para o Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}