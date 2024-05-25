import React, { useState } from 'react';
import axios from 'axios';

function PesquisarAtividade() {
    const [codigo, setCodigo] = useState('');
    const [atividade, setAtividade] = useState(null);
    const [erro, setErro] = useState('');
    const [novoAnexo, setNovoAnexo] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/atividade/pesquisar/${codigo}`);
            setAtividade(response.data);
            setErro('');
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            setAtividade(null);
            setErro('Atividade não encontrada ou erro na pesquisa.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAtividade(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAnexoChange = (event) => {
        setNovoAnexo(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (atividade && atividade.codigo) {
            try {
                const formData = new FormData();
                formData.append('nome', atividade.nome);
                formData.append('descricao', atividade.descricao);
                formData.append('pontos', atividade.pontos);
                formData.append('item', atividade.item);
                formData.append('codigo', atividade.item);

                formData.append('turma', atividade.turma);
                if (novoAnexo) {
                    formData.append('anexo', novoAnexo);
                }

                const response = await axios.put(`http://localhost:5000/atividade/editar/${atividade.codigo}`, formData, {
                   
                });
                console.log('Resposta do servidor:', response.data);
                alert('Atividade atualizada com sucesso');
            } catch (error) {
                console.error('Erro ao atualizar atividade:', error);
                alert('Erro ao atualizar atividade.');
            }
        } else {
            alert('Por favor, pesquise uma atividade antes de tentar atualizar.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Editar Atividade</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Digite o codigo da atividade para pesquisa"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar
                </button>
            </div>
            {atividade && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-100">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            value={atividade.nome || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descrição
                        <input
                            type="text"
                            name="descricao"
                            value={atividade.descricao || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Codigo
                        <input
                            type="text"
                            name="codigo"
                            value={atividade.codigo || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Pontos
                        <input
                            type="number"
                            name="pontos"
                            value={atividade.pontos || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item
                        <input
                            type="number"
                            name="item"
                            value={atividade.item || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Turma
                        <input
                            type="number"
                            name="turma"
                            value={atividade.turma || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Anexo Atual
                        </label>
                        {atividade.anexo && (
                            <a
                                href={`data:application/pdf;base64,${atividade.anexo}`}
                                download="anexo.pdf"
                                className="text-blue-500"
                            >
                                Baixar Anexo
                            </a>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Novo Anexo
                        </label>
                        <input
                            type="file"
                            id="anexo"
                            accept=".pdf"
                            onChange={(e) => setNovoAnexo(e.target.files[0])} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Atualizar
                    </button>
                </form>
            )}
            {erro && <p className="text-red-500">{erro}</p>}
        </div>
    );
}

export default PesquisarAtividade;
