import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DarFeedback() {
    const [codigo, setCodigo] = useState('');
    const [atividades, setAtividades] = useState([]);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/resposta/ver/${codigo}`);
            setAtividades(response.data);
            setErro('');
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            setAtividades([]);
            setErro('Atividade não encontrada ou erro na pesquisa.');
        }
    };

    const handleAvaliar = (id) => {
        navigate(`/feedback/avaliar/${codigo}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Pesquisar Atividade</h1>
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
            {atividades.length > 0 ? (
                <ul className="space-y-4">
                    {atividades.map((atividade) => (
                        <li key={atividade.id} className="p-4 border rounded bg-gray-100 text-gray-700">
                            <h2 className="text-xl font-bold">{atividade.nome}</h2>
                            <p><strong>Descrição:</strong> {atividade.descricao}</p>
                            <p><strong>Aprovado:</strong> {atividade.aprovado}</p>
                            {atividade.anexo && (
                                <a
                                    href={`data:application/pdf;base64,${atividade.anexo}`}
                                    download="anexo.pdf"
                                    className="text-blue-500"
                                >
                                    Baixar Anexo
                                </a>
                            )}
                            <button
                                onClick={() => handleAvaliar(atividade.id)}
                                className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Avaliar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhuma atividade encontrada.</p>
            )}
            {erro && <p className="text-red-500">{erro}</p>}
        </div>
    );
}

export default DarFeedback;
