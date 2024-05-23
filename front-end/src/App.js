import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';  // Certifique-se de que o caminho para o componente está correto
import ClassRegistration from './pages/CadastroTurma';
import RoleBasedRoute from './RoleValidator';
import CadastroUsuario from './pages/CadastroUsuario';
import PesquisarUsuario from './pages/PesquisarUsuario';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();  // Agora dentro do contexto do Router
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="flex">
      {/* Renderiza a Nav Bar somente se não estiver na tela de login */}
      {!isLoginRoute && (
        <div className="min-h-screen bg-gray-800 p-5 text-white">
          <button onClick={() => setIsOpen(!isOpen)} className="mb-2">
            {isOpen ? '➖' : '➕'}
          </button>
          {isOpen && (
            <ul className="flex flex-col">
              <li className="my-2">
                <Link to="/login" className="text-white hover:text-blue-500">Login</Link>
              </li>
              <li className="my-2">
                <Link to="/usuario/cadastro" className="text-white hover:text-blue-500">Cadastro de Usuário</Link>
              </li>
            </ul>
          )}
        </div>
      )}
      {/* Área Principal de Conteúdo */}
      <div className="flex-grow p-5">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/turma/cadastro" element={
                    <RoleBasedRoute requiredRoles="{[admin]}">
                        <ClassRegistration />
                    </RoleBasedRoute>
                } />
          <Route path="/usuario/cadastro" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <CadastroUsuario />
                        </RoleBasedRoute>
                } />
           <Route path="/usuario/pesquisar" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <PesquisarUsuario />
                        </RoleBasedRoute>
                } />     
        </Routes>
      </div>
    </div>
  );
}

export default App;
