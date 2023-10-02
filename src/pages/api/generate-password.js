import { PrismaClient } from "../../../prisma/generated/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { site, email, userId, masterkey } = req.body;

      // Gere uma senha aleatória
      const randomPassword = cryptoRandomString({ length: 12, type: "base64" });

      if (!randomPassword) {
        // Verifique se a senha foi gerada com sucesso
        throw new Error("Erro ao gerar a senha");
      }

      // Crie uma entrada no banco de dados com a senha gerada e o userId
      const password = await prisma.password.create({
        data: { site, value: randomPassword, userId, email , masterkey },
      });

      res.status(201).json(password);
    } catch (error) {
      console.error("Erro ao criar a senha:", error);
      res.status(500).json({ error: "Erro ao criar a senha" });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
