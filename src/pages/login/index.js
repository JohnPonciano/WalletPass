// pages/Login.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import '../../app/globals.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [masterKey, setMasterKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Envie os dados para o endpoint /api/auth para fazer login
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, masterKey }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('masterkey',data.data.masterKey);
        // Redirecione o usuário para a página de perfil ou realize outras ações aqui
        router.push('/dashboard'); 
      } else {
        console.log('Erro no login');
        setError('Email, senha ou senha mestra incorretos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro interno ao fazer login');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha Secundária:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="masterKey" className="form-label">
            Senha Mestre:
          </label>
          <br />
          <small className='text-body-secondary'>Salve a senha mestra em um lugar físico antes de completar o cadastro</small>
          <input
            type="text"
            className="form-control"
            id="masterKey"
            value={masterKey}
            onChange={(e) => setMasterKey(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link className="btn btn-secondary mx-2"href="/register">
          Cadastro
        </Link>
      </form>
    </div>
  );
};

export default Login;
