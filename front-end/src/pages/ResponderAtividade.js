import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResponderAtividade() {
    const { codigo } = useParams();
    const [resposta, setResposta] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const matricula = localStorage.getItem('matricula');
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/atividade/responder/${codigo}`, { resposta, matricula }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Resposta enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            setErro('Erro ao enviar resposta.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Responder Atividade</h1>
            {erro && <p className="text-red-500">{erro}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resposta
                    <textarea
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar Resposta
                </button>
            </form>
        </div>
    );
}

export default ResponderAtividade;
