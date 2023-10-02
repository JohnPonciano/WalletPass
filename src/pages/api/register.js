// pages/api/register.js

import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, masterKey } = req.body;

    try {
      // Verifique se o email já está registrado
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        res.status(409).json({ message: 'Email já registrado' });
      } else {
        // Registre o novo usuário no banco de dados
        const newUser = await prisma.user.create({
          data: {
            email,
            masterKey,
            passwords: {
              create: {
                site: 'wallet-pass.local',
                value: password,
                email: email,
              },
            },
          },
        });

        res.status(201).json({ message: 'Registro bem-sucedido', data: newUser });
      }
    } catch (error) {
      console.error('Erro ao fazer o registro:', error);
      res.status(500).json({ message: 'Erro interno ao fazer o registro' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
