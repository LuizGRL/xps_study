import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VerItensUsuario() {
    const [itens, setItens] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const matricula = localStorage.getItem('matricula');
                const response = await axios.get(`http://localhost:5000/item/ver/${matricula}`);
                setItens(response.data);
                setErro('');
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
                setItens([]);
                setErro('Erro ao buscar itens do usuário.');
            }
        };

        fetchItens();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Itens do Usuário</h1>
            {erro && <p className="text-red-500">{erro}</p>}
            {itens.length > 0 ? (
                <ul className="space-y-4">
                    {itens.map((item) => (
                        <li key={item.id} className="p-4 border rounded bg-gray-100 text-gray-700">
                            <h2 className="text-xl font-bold">{item.nome}</h2>
                            <p><strong>Descrição:</strong> {item.descricao}</p>
                            {item.imagem && (
                        <div>
                            <img src={`data:image/jpeg;base64,${item.imagem}`} alt="Imagem do item" className="mt-2 max-w-xs" />
                        </div>
                    )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Nenhum item encontrado.</p>
            )}
        </div>
    );
}

export default VerItensUsuario;
