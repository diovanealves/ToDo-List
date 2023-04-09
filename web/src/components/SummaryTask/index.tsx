import { useEffect, useState } from "react";
import { Trash, CheckCircle, Circle } from "phosphor-react";

import { api } from "../../lib/axios";
import { TaskEmpty } from "../TaskEmpty";

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

    await api
      .patch(`/todo/${taskId}/complete`, { completed: !taskUpdate.completed })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteTask(taskId: string) {
    await api.delete(`/todos/${taskId}`).then((res) => {
      alert("Task Deletada");
    });
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
                <Circle />
              </button>
              <h1 className="font-bold">{task.title}</h1>
            </div>
            <button onClick={() => deleteTask(task.id)}>
              <Trash size={23} />
            </button>
          </div>
        ))
      ) : (
        <TaskEmpty />
      )}
    </div>
  );
}
