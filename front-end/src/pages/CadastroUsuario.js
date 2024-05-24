import React, { useState } from 'react';
import axios from 'axios';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usuario/cadastro', {
        nome,descricao,codigo
      });
      console.log(response.data); 
      alert('Usuario inserido com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar turma:', error);
      alert('Erro ao cadastrar turma.'+ error);
    }
  };

  return (
    <div className="flex justify-center ">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-5 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Cadastro de Turma</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="className">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
            codigo
          </label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Registrar Usuário
        </button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
