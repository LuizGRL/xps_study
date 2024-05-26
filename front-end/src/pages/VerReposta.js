import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VerRespostas() {
    const { codigo } = useParams();
    const [respostas, setRespostas] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchRespostas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/resposta/pesquisar/${codigo}`);
                setRespostas(response.data);
                console.log(response.data)
                setErro('');
            } catch (error) {
                console.error('Erro ao buscar respostas:', error);
                setErro('Erro ao buscar respostas.');
                setRespostas([]);
            }
        };

        fetchRespostas();
    }, [codigo]);

    return (
        <div className="container mx-auto p-4">
            {respostas && (
                <form className="mt-4 p-4 border rounded bg-gray-100">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            value={respostas.nome || ''}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descrição
                        <input
                            type="text"
                            name="descricao"
                            value={respostas.descricao || ''}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Aprovado
                        <input
                            type="text"
                            name="aprovado"
                            value={respostas.aprovado || ''}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>
                  
                   
    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Anexo Atual
                        </label>
                        {respostas.anexo && (
                            <a
                                href={`data:application/pdf;base64,${respostas.anexo}`}
                                download="anexo.pdf"
                                className="text-blue-500"
                            >
                                Baixar Anexo
                            </a>
                        )}
                    </div>
                
                  
                </form>
            )}
            {erro && <p className="text-red-500">{erro}</p>}
        </div>
    );
}

export default VerRespostas;
