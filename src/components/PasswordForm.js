import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PasswordForm = ({ onCreate }) => {
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const router = useRouter(); // Inicialize o useRouter

  useEffect(() => {
    // Verifique se o userId não existe no localStorage
    const userId = localStorage.getItem("userId");
    const masterkey = localStorage.getItem("masterKey");
    if (!userId && !masterkey) {
      console.log("Você não está logado");
      router.push("/login"); // Redireciona para a página de login
    }
  }, []);

  const generatePassword = async () => {
    try {
      const userId_str = localStorage.getItem("userId");
      const userId = parseInt(userId_str)
      const masterkey = localStorage.getItem("masterKey");
      if (!userId && !masterkey ) {
        console.log("Você não está logado");
        router.push("/login"); // Redireciona para a página de login
        return; // Retorna imediatamente para evitar a execução do código restante
      }
      
      const response = await fetch("/api/generate-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site, email, userId }), // Use o userId aqui
      });

      if (response.status === 201) {
        const data = await response.json();
        onCreate(data);

        // Redirecione para a página '/' após o sucesso
        router.push("/dashboard");
      } else {
        setError("Falha ao gerar a senha");
      }
    } catch (error) {
      setError("Erro ao gerar a senha: " + error.message);
    }
  };

  return (
    <div className="m-3">
      <div className="mb-3 ">
        <label htmlFor="site" className="form-label">
          Site
        </label>
        <input
          type="text"
          className="form-control"
          id="site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex-row d-flex justify-content-center">
        <button className="btn btn-primary m-3" onClick={generatePassword}>
          Create and Generate Password
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default PasswordForm;
