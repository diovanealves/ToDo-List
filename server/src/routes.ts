import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/todos", async (req, res) => {
    const todos = await prisma.toDo.findMany();
    return {
      todos,
    };
  });
}
