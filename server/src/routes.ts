import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/todos", async (req, res) => {
    const todos = await prisma.toDo.findMany();
    return {
      todos,
    };
  });

  app.post("/todo", async (req, res) => {
    const createToDO = z.object({
      title: z.string(),
    });
    const { title } = createToDO.parse(req.body);

    await prisma.toDo.create({
      data: {
        title,
      },
    });
  });
}
