import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('matricula', response.data.username);

        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
            setShowError(true);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    // Pop-up de erro integrado
    function ErrorPopUp({ message, onClose }) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-red-500">Erro!</h2>
                    <p>{message}</p>
                    <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Fechar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black flex items-center justify-center">
            <div className="w-full max-w-xs p-8 bg-purple-500 rounded-lg shadow-md bg-purple">
                <h1 className="text-white text-xl text-center mb-6">LOGIN</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 text-black rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 text-black rounded-md"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
                    >
                        Entrar
                    </button>
                </form>
                {showError && <ErrorPopUp message={error} onClose={handleCloseError} />}
            </div>
        </div>
    );
}

export default Login;
