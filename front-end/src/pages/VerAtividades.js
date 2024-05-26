import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const matricula = localStorage.getItem('matricula');
                console.log('Matrícula:', matricula);
                const response = await axios.get(`http://localhost:5000/atividade/ver/${matricula}`);
                setAtividades(response.data);
                setErro('');
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
                setErro('Erro ao buscar atividades.');
                setAtividades([]);
            }
        };

        fetchAtividades();
    }, []);

    const handleResponder = (codigo) => {
        // Redireciona para a página de resposta da atividade
        navigate(`/resposta/${codigo}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Atividades do Usuário</h1>
            {erro && <p className="text-red-500">{erro}</p>}
            {atividades.length > 0 ? (
                <ul className="space-y-4">
                    {atividades.map((atividade) => (
                        <li key={atividade.codigo} className="p-4 border rounded bg-gray-100 text-gray-700">
                            <h2 className="text-xl font-bold">{atividade.nome}</h2>
                            <p><strong>Descrição:</strong> {atividade.descricao}</p>
                            <p><strong>Código:</strong> {atividade.codigo}</p>
                            <p><strong>Pontos:</strong> {atividade.pontos}</p>
                            <p><strong>Item:</strong> {atividade.item}</p>
                            {atividade.anexo && (
                                <a
                                    // href={`data:application/pdf;base64,${atividade.anexo}`}
                                    // download="anexo.pdf"
                                    // className="text-blue-500"
                                >
                                    Baixar Anexo
                                </a>
                            )}
                            <button
                                onClick={() => handleResponder(atividade.codigo)}
                                className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Responder
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhuma atividade encontrada.</p>
            )}
        </div>
    );
}

export default VerAtividades;
