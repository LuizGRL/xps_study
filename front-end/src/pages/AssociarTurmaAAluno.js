import React, { useState } from 'react';
import axios from 'axios';

function AssociarAlunoTurma() {
    const [codigo, setCodigo] = useState('');
    const [matricula, setMatricula] = useState('');
    const [turma, setTurma] = useState(null);
    const [aluno, setAluno] = useState(null);
    const [erroTurma, setErroTurma] = useState('');
    const [erroAluno, setErroAluno] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSearchTurma = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/turma/pesquisar/${codigo}`);
            setTurma(response.data);
            setErroTurma('');
        } catch (error) {
            console.error('Erro na pesquisa da turma:', error);
            setTurma(null);
            setErroTurma('Turma não encontrada ou erro na pesquisa.');
        }
    };

    const handleSearchAluno = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/usuario/pesquisar/${matricula}`);
            setAluno(response.data);
            setErroAluno('');
        } catch (error) {
            console.error('Erro na pesquisa do aluno:', error);
            setAluno(null);
            setErroAluno('Aluno não encontrado ou erro na pesquisa.');
        }
    };

    const handleAssociate = async () => {
        if (turma && aluno) {
            try {
                const response = await axios.post(`http://localhost:5000/turma/associar`, {
                    codigo: turma.codigo,
                    matricula: aluno.matricula
                });
                console.log('Resposta do servidor:', response.data);
                setMensagem('Aluno associado à turma com sucesso.');
                setErroTurma('');
                setErroAluno('');
            } catch (error) {
                console.error('Erro ao associar aluno à turma:', error);
                setMensagem('Erro ao associar aluno à turma.');
            }
        } else {
            setMensagem('Por favor, pesquise uma turma e um aluno antes de tentar associar.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Associar Aluno à Turma</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Digite o código da turma para pesquisa"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSearchTurma}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar Turma
                </button>
                {erroTurma && <p className="text-red-500">{erroTurma}</p>}
            </div>
            {turma && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <p className="text-gray-700"><strong>Turma:</strong> {turma.nome}</p>
                </div>
            )}

            <div className="mt-4 mb-4">
                <input
                    type="text"
                    placeholder="Digite a matrícula do aluno para pesquisa"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    onClick={handleSearchAluno}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Pesquisar Aluno
                </button>
                {erroAluno && <p className="text-red-500">{erroAluno}</p>}
            </div>
            {aluno && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <p className="text-gray-700"><strong>Aluno:</strong> {aluno.nome}</p>
                </div>
            )}

            <button
                onClick={handleAssociate}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Associar Aluno à Turma
            </button>
            {mensagem && <p className={mensagem.includes('sucesso') ? 'text-green-500' : 'text-red-500'}>{mensagem}</p>}
        </div>
    );
}

export default AssociarAlunoTurma;
