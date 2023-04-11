import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Trash, CheckCircle, Circle, Pencil, X } from "phosphor-react";

import { api } from "../../lib/axios";
import { TaskEmpty } from "../TaskEmpty";
import { EditTask } from "../EditTask";

type SummaryTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export function SummaryTask() {
  const [summary, setSummary] = useState<SummaryTask[]>([]);

  async function completedTask(taskId: string) {
    const taskUpdate = summary.find((task) => task.id === taskId);

    if (!taskUpdate) {
      return;
    }

    await api.patch(`/todo/${taskId}/complete`, {
      completed: !taskUpdate.completed,
    });
  }

  async function deleteTask(taskId: string) {
    await api.delete(`/todos/${taskId}`);
    alert("Task Deletada");
  }

  useEffect(() => {
    api.get("todos").then((res) => {
      setSummary(res.data);
    });
  }, [summary]);

  return (
    <div className="max-w-lg w-11/12 flex flex-col gap-3 mt-10">
      {summary.length > 0 ? (
        summary.map((task) => (
          <div
            key={task.id}
            className="flex flex-1 justify-between items-center px-6 py-4 bg-gray-800 rounded-lg"
          >
            <div className="flex gap-5">
              <button onClick={() => completedTask(task.id)}>
                {task.completed == true ? (
                  <CheckCircle weight="fill" size={24} color="#1E6F9F" />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <h1 className={task.completed ? "line-through opacity-40" : ""}>
                {task.title}
              </h1>
            </div>
            <div className="flex gap-2">
              <Dialog.Root>
                <Dialog.Trigger type="button">
                  <Pencil size={23} />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content className="absolute p-10 bg-gray-800 rounded-lg w-11/12 max-w-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:text-[#1E6F9F] focus:ring-offset-2 focus:ring-offset-[#1E6F9F]">
                      <X size={23} aria-label="Fechar" />
                    </Dialog.Close>
                    <Dialog.Title className="text-3xl leading-tight font-extrabold">
                      Editar Tarefa
                    </Dialog.Title>
                    <EditTask data={task.id} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <button onClick={() => deleteTask(task.id)}>
                <Trash size={23} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <TaskEmpty />
      )}
    </div>
  );
}
