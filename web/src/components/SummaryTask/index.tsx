import { useEffect, useState } from "react";
import { Trash, CheckCircle, Circle } from "phosphor-react";

import { api } from "../../lib/axios";
import { TaskEmpty } from "../TaskEmpty";

type SummaryTask = Array<{
  id: string;
  title: string;
  completed: string;
  createdAt: Date;
}>;

export function SummaryTask() {
  const [summary, setSummary] = useState<SummaryTask>([]);
  const [completed, setCompleted] = useState(false);

  // Pode rolar melhorias nesse Função OBS: não e gambiarra se esta funcionando!
  async function completedTask(taskId: string) {
    if (completed == false) {
      await api
        .patch(`/todo/${taskId}/complete`, { completed: true })
        .then((res) => {
          setCompleted(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await api
        .patch(`/todo/${taskId}/complete`, { completed: false })
        .then((res) => {
          setCompleted(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                {completed == true ? (
                  <CheckCircle weight="fill" size={24} color="#b0ff92" />
                ) : (
                  <Circle weight="bold" size={24} />
                )}
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
