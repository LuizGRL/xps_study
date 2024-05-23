import React, { useState } from 'react';
import axios from 'axios';

function EditarUsuario() {
    const [matricula, setMatricula] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/usuario/pesquisar/${matricula}`);
            setUsuario(response.data);
            setErro('');
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            setUsuario(null);
            setErro('Usuário não encontrado ou erro na pesquisa.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/usuario/atualizar/${usuario.matricula}`, usuario);
            console.log(response.data);
            alert('Usuário atualizado com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Editar Usuário</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Digite a matrícula para pesquisa"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar
                </button>
            </div>
            {usuario && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-100">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            value={usuario.nome || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="nome"
                            value={usuario.sobrenome || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="nome"
                            value={usuario.cpf || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="nome"
                            value={usuario.email || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="nome"
                            value={usuario.telefone || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="text"
                            name="nome"
                            value={usuario.role || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
           
                    </label>
                    {/* Repetir a estrutura de label/input para outros campos como sobrenome, email, etc. */}
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

export default EditarUsuario;
