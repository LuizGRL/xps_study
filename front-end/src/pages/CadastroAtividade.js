import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pontos, setPontos] = useState('');
  const [anexo, setAnexo] = useState(null); // inicialize com null para arquivos
  const [item, setItem] = useState('');
  const [turma, setTurma] = useState('');
  const [codigo, setCodigo] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/turma/turmas');
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao carregar turmas:', error);
      }
    };

    const fetchItens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/item/itens');
        setItens(response.data);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    fetchTurmas();
    fetchItens();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('pontos', pontos);
    formData.append('anexo', anexo);
    formData.append('item', item);
    formData.append('turma', turma);
    formData.append('codigo', codigo);

    try {
      const response = await axios.post('http://localhost:5000/atividade/cadastro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Atividade inserida com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar atividade:', error);
      alert('Erro ao cadastrar atividade: ' + error);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-5 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Cadastro de Atividade</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
            Descrição
          </label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo">
            Codigo
          </label>
          <textarea
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pontos">
            Pontos
          </label>
          <input
            type="number"
            id="pontos"
            value={pontos}
            onChange={(e) => setPontos(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
            Item
          </label>
          <select
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Selecione um item</option>
            {itens.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turma">
            Turma
          </label>
          <select
            id="turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required>
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="anexo">
            Anexo (PDF)
          </label>
          <input
            type="file"
            id="anexo"
            accept=".pdf"
            onChange={(e) => setAnexo(e.target.files[0])} // Note the change here
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrar Atividade
        </button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
