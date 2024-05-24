import React, { useState } from 'react';
import axios from 'axios';

function EditarTurma() {
    const [codigo, setCodigo] = useState('');
    const [turma, setTurma] = useState(null);
    const [erro, setErro] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/turma/pesquisar/${codigo}`);
            setTurma(response.data);
            setErro('');
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            setTurma(null);
            setErro('Turma não encontrada ou erro na pesquisa.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTurma(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (turma && turma.codigo) {
            try {
                console.log(`Enviando dados para atualizar: ${JSON.stringify(turma)}`);
                const response = await axios.put(`http://localhost:5000/turma/editar/${turma.codigo}`, turma);
                console.log('Resposta do servidor:', response.data);
                alert('Turma atualizada com sucesso');
            } catch (error) {
                console.error('Erro ao atualizar Turma:', error);
                alert('Erro ao atualizar turma.');
            }
        } else {
            alert('Por favor, pesquise uma turma antes de tentar atualizar.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Editar Turma</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Digite o codigo da turma para pesquisa"
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
            {turma && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-100">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            value={turma.nome || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="descricao"
                            value={turma.descricao || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                       
                        <input
                            type="codigo"
                            name="text"
                            value={turma.codigo || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    
                    </label>
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

export default EditarTurma;
