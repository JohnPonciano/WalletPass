// pages/api/generate-masterkey.js

import { PrismaClient } from "../../../prisma/generated/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Gere a chave mestra aleatória (por exemplo, 32 caracteres)
      const masterKey = cryptoRandomString({ length: 32, type: "base64" });

      if (!masterKey) {
        // Verifique se a chave mestra foi gerada com sucesso
        throw new Error("Erro ao gerar a chave mestra");
      }

      // Salve a chave mestra em algum local seguro no servidor
      // Por exemplo, você pode armazená-la em uma variável de ambiente ou em um arquivo

      res.status(201).json({ masterKey });
    } catch (error) {
      console.error("Erro ao gerar a chave mestra:", error);
      res.status(500).json({ error: "Erro ao gerar a chave mestra" });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
