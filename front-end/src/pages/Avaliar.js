import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AvaliarAtividade() {
    const { id } = useParams();
    const [descricao, setDescricao] = useState('');
    const [aprovado, setAprovado] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
    };

    const handleAprovadoChange = (event) => {
        setAprovado(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:5000/feedback/avaliar`, {
                id_atividade: id,
                descricao,
                aprovado
            });
            alert('Atividade avaliada com sucesso');
            navigate(-1); // Volta para a página anterior
        } catch (error) {
            console.error('Erro ao avaliar atividade:', error);
            setErro('Erro ao avaliar atividade.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Avaliar Atividade</h1>
            {erro && <p className="text-red-500">{erro}</p>}
            <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-100">
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descrição
                        <textarea
                            value={descricao}
                            onChange={handleDescricaoChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </label>
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Avaliação
                        <select
                            value={aprovado}
                            onChange={handleAprovadoChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Selecione uma opção</option>
                            <option value="S">Aprovado</option>
                            <option value="N">Não Aprovado</option>
                        </select>
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar Avaliação
                </button>
            </form>
        </div>
    );
}

export default AvaliarAtividade;
