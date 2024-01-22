import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import '../../app/globals.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [masterKey, setMasterKey] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const router = useRouter();
  const emailRef = useRef(null);

  useEffect(() => {
    generateMasterKey();
  }, []);

  const generateMasterKey = async () => {
    try {
      const response = await fetch('/api/generate-masterkey', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setMasterKey(data.masterKey);
      } else {
        console.log('Erro ao gerar a masterKey');
      }
    } catch (error) {
      console.error('Erro ao gerar a masterKey:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Envie os dados para o endpoint /api/auth
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, masterKey }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registro bem-sucedido:', data);
        router.push("/login");
      } else {
        const responseData = await response.json();
        setError(responseData.message); // Configurar a mensagem de erro do estado
        emailRef.current.focus(); // Colocar foco no campo de email após um erro
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setError('Erro interno no registro');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Registro</h1>
      <form onSubmit={handleRegister}>
      {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
            ref={emailRef}
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
          <br/>
          <small className='text-body-secondary'>Salve a senha mestra em  um lugar fisico antes de completar o cadastro</small>
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
          Registrar
        </button>
        <Link className="btn btn-secondary mx-2"href="/login">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
