import { PrismaClient } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    console.log("Receive password with ID:", id);
    try {
      const id_int = parseInt(id);
      console.log("Deleting password with ID:", id_int);

      const deletedPassword = await prisma.password.delete({
        where: {
          id: id_int
        },
      });

      if (deletedPassword) {
        console.log("Password deleted successfully");
        res.status(204).end();
      } else {
        console.log("Password not found");
        res.status(404).json({ error: "Password not found" });
      }
    } catch (error) {
      console.error("Error deleting password:", error);
      res.status(500).json({ error: "Error deleting password" });
    }
  } else {
    console.log("Invalid request method:", req.method);
    res.status(405).end();
  }
}
