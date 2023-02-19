import { z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/todos", async (req, res) => {
    const todos = await prisma.toDo.findMany();
    return todos;
  });

  app.post("/todo", async (request) => {
    const createToDo = z.object({
      title: z.string(),
    });

    const { title } = createToDo.parse(request.body);

    await prisma.toDo.create({
      data: {
        title,
      },
    });
  });

  app.put("/update/:id", async (req) => {
    const updateToDo = z.object({
      id: z.string(),
      title: z.string(),
    });

    const { id, title } = updateToDo.partial().parse(req.body);
    await prisma.toDo.update({
      where: { id: Number(id) },
      data: {
        title,
      },
    });
  });

  app.patch("/todo/:id/complete", async (req, res) => {
    const completedToDo = z.object({ id: z.string(), completed: z.boolean() });

    const { id } = completedToDo.partial().parse(req.params);
    const { completed } = completedToDo.partial().parse(req.body);

    const updateTodo = await prisma.toDo.update({
      where: { id: Number(id) },
      data: {
        completed: completed,
      },
    });
    return updateTodo;
  });

  app.delete<{ Params: { id: string } }>("/todos/:id", async (req, res) => {
    const { id } = req.params;

    await prisma.toDo.delete({
      where: { id: Number(id) },
    });
  });
}
