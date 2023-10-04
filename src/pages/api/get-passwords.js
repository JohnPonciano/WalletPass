import { PrismaClient } from "../../../prisma/generated/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, masterKey } = req.body;

      // Verifique se as credenciais do usuário são válidas
      const user = await prisma.user.findFirst({
        where: {
          id: parseInt(userId), // Converta userId para um número, se necessário
          masterKey: masterKey,
        },
      });

      if (!user || !masterKey) {
        // Se as credenciais não forem válidas, retorne um erro
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      // Se as credenciais forem válidas, busque as senhas do usuário
      const passwords = await prisma.password.findMany({
        where: {
          userId: parseInt(userId),// Converta userId para um número, se necessário
          NOT: {
            site: 'wallet-pass.local'
          } 
        },
        select: {
          id: true,
          site: true,
          email: true,
          value: true,
        },
      });

      res.status(200).json(passwords);
    } catch (error) {
      console.error("Erro ao buscar senhas:", error);
      res.status(500).json({ error: "Erro ao buscar senhas" });
    }
  } else {
    // Retorne um erro se o método da solicitação não for POST
    res.status(405).json({ error: "Método não permitido" });
  }
}
