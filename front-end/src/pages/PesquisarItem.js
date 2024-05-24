import React, { useState } from 'react';
import axios from 'axios';

function PesquisarItem() {
    const [id, setId] = useState('');
    const [item, setItem] = useState(null);
    const [erro, setErro] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/item/pesquisar/${id}`);
            setItem(response.data);
            setErro('');
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            setItem(null);
            setErro('Item não encontrado ou erro na pesquisa.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (item && item.id) {
            try {
                console.log(`Enviando dados para atualizar: ${JSON.stringify(item)}`);
                const response = await axios.put(`http://localhost:5000/item/editar/${item.id}`, item);
                console.log('Resposta do servidor:', response.data);
                alert('Item atualizado com sucesso');
            } catch (error) {
                console.error('Erro ao atualizar item:', error);
                alert('Erro ao atualizar item.');
            }
        } else {
            alert('Por favor, pesquise um item antes de tentar atualizar.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Editar item</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Digite o id do item para pesquisa"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar
                </button>
            </div>
            {item && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-100">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            value={item.nome || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="descricao"
                            value={item.descricao || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                       
                       <input
                            type="text"
                            name="imagem"
                            value={item.imagem || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {item.imagem && (
                            <div>
                            <img src={`data:image/jpeg;base64,${item.imagem}`} alt="Imagem do item" className="mt-2 max-w-xs" />
                            </div>
                        )}
                       
                    
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

export default PesquisarItem;
