import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';  
import ClassRegistration from './pages/CadastroTurma';
import RoleBasedRoute from './RoleValidator';
import CadastroUsuario from './pages/CadastroUsuario';
import PesquisarUsuario from './pages/PesquisarUsuario';
import PesquisarTurma from './pages/PesquisarTurma'
import AssociarAlunoTurma  from './pages/AssociarTurmaAAluno';  
import CadastroItem from './pages/CadastroItem';
import PesquisarItem from './pages/PesquisarItem';
import CadastroAtividade from './pages/CadastroAtividade';
import PesquisarAtividade from './pages/PesquisarAtividade';
import VerAtividades from './pages/VerAtividades';
import ResponderAtividade from './pages/ResponderAtividade';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();  
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="flex">
      {!isLoginRoute && (
        <div className="min-h-screen bg-gray-800 p-5 text-white">
          <button onClick={() => setIsOpen(!isOpen)} className="mb-2">
            {isOpen ? '➖' : '➕'}
          </button>
          {isOpen && (
            <ul className="flex flex-col">
              
              <li className="my-2">
                <Link to="/usuario/cadastro" className="text-white hover:text-blue-500">Cadastro de Usuário</Link>
              </li>
              <li className="my-2">
                <Link to="/usuario/pesquisar" className="text-white hover:text-blue-500">Pesquisar Usuário</Link>
              </li>
              <li className="my-2">
                <Link to="/turma/cadastro" className="text-white hover:text-blue-500">Cadastro de turma</Link>
              </li>
              <li className="my-2">
                <Link to="/turma/pesquisar" className="text-white hover:text-blue-500">Pesquisar Turma</Link>
              </li>
              <li className="my-2">
                <Link to="/turma/associar" className="text-white hover:text-blue-500">Associar aluno a Turma</Link>
              </li>
              <li className="my-2">
                <Link to="/item/cadastro" className="text-white hover:text-blue-500">Cadastro item</Link>
              </li>
              <li className="my-2">
                <Link to="/item/pesquisar" className="text-white hover:text-blue-500">Pesquisar item</Link>
              </li>
              <li className="my-2">
                <Link to="/atividade/cadastro" className="text-white hover:text-blue-500">Cadastro Atividade</Link>
              </li>
              <li className="my-2">
                <Link to="/atividade/pesquisar" className="text-white hover:text-blue-500">Pesquisar Atividade</Link>
              </li>
              <li className="my-2">
                <Link to="/atividade/ver" className="text-white hover:text-blue-500">Ver Atividades</Link>
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

               <Route path="/turma/pesquisar" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <PesquisarTurma />
                        </RoleBasedRoute>
                } />     
                  <Route path="/turma/associar" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <AssociarAlunoTurma />
                        </RoleBasedRoute>
                } />   
                <Route path="/item/cadastro" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <CadastroItem />
                        </RoleBasedRoute>
                } />  
                <Route path="/item/pesquisar" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <PesquisarItem />
                        </RoleBasedRoute>
                } />  
                   <Route path="/atividade/cadastro" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <CadastroAtividade />
                        </RoleBasedRoute>
                } />  
                <Route path="/atividade/pesquisar" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <PesquisarAtividade />
                        </RoleBasedRoute>
                } />  
                <Route path="/atividade/ver" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <VerAtividades />
                        </RoleBasedRoute>
                } />  
                  <Route path="/resposta/:cadastro" element={
                        <RoleBasedRoute requiredRoles={["admin"]}> 
                          <ResponderAtividade />
                        </RoleBasedRoute>
                } />  
        </Routes>
      </div>
    </div>
  );
}

export default App;
