// pages/api/auth.js

import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, masterKey } = req.body; // Adicione masterKey aqui

    try {
      // Consulte o banco de dados para verificar se o email, senha e masterKey correspondem a um usuário
      const user = await prisma.user.findFirst({
        where: {
          email,
          masterKey,
        },
        include: {
          passwords: {
            where: {
              site: 'wallet-pass.local',
              value: password,
            },
          },
        },
      });

      if (user && user.passwords.length > 0) {
        // O usuário e a senha correspondem, retorno de sucesso
        res.status(200).json({ message: 'Login bem-sucedido', data: user });
      } else {
        // Nenhum usuário correspondente ou senha incorreta
        res.status(401).json({ message: 'Email, senha ou masterKey incorretos' });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro interno ao fazer login' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }

  
}

export const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  const masterkey = localStorage.getItem("masterkey");
  return !!userId && !!masterkey;
};