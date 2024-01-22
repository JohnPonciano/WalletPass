import React, { useState, useEffect } from "react";
import Link from "next/link";
import PasswordField from "./BlurPassword";


const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [userId, setUserId] = useState("");
  const [masterKey, setMasterKey] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
      setMasterKey(localStorage.getItem("masterkey"));
    }
  }, []);

  useEffect(() => {
    if (userId && masterKey) {
      const fetchPasswords = async () => {
        try {
          const response = await fetch("/api/get-passwords", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, masterKey }),
          });

          if (response.status === 200) {
            const data = await response.json();
            setPasswords(data);
          } else {
            console.log("Você não está logado ou tivemos erros ao buscar senhas");
          }
        } catch (error) {
          console.error("Erro ao buscar senhas:", error);
        }
      };
      fetchPasswords();
    }
  }, [userId, masterKey]);

  const onDelete = async (passwordId) => {
    try {
      const response = await fetch(`/api/delete-password/${passwordId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, masterKey, passwordId }),
      });

      if (response.status === 204) {
        // Atualize a lista de senhas após a exclusão bem-sucedida
        setPasswords((prevPasswords) =>
          prevPasswords.filter((password) => password.id !== passwordId)
        );
      } else {
        console.error("Falha ao deletar senha");
      }
    } catch (error) {
      console.error("Erro ao deletar senha:", error);
    }
  };

  const handleLogout = () => {
    // Limpar o cache e redirecionar para a página de login (ou qualquer outra página desejada)
    localStorage.clear();
    window.location.href = "/login";
  };

  // Filtra as senhas para excluir aquelas com 'wallet-pass.local' no site
  const filteredPasswords = passwords.filter((password) => password.site !== "wallet-pass.local");

  return (
    <div className={`container mt-4 `}>
      <h2>🔒 Passwords</h2>
      <br/>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
      <Link href="/lobby" className={`btn btn-success mb-4 `}>
        Add new
      </Link>

      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logouts
      </button>
      </div>
    </nav>





      

      
      

      <div className={` table-responsive `}>
        <table className={`table table-striped table-dark`}>
          <thead>
            <tr>
              <th>Site</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPasswords.map((password) => (
              <tr key={password.id}>
                <td>{password.site}</td>
                <td>{password.email}</td>
                <PasswordField initialPassword={password.value} />
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(password.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PasswordList;
