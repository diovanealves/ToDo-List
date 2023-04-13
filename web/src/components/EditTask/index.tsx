import { useState } from "react";
import { api } from "../../lib/axios";
import { Check } from "phosphor-react";

interface Props {
  data: string;
}

export function EditTask({ data }: Props) {
  const [inputEditTask, setInputEditTask] = useState("");

  async function handleEditTask() {
    if (!inputEditTask) {
      return alert("Erro na alteração da tarefa.");
    }

    await api.patch(`/todo/${data}/complete`, {
      completed: false,
    });

    await api.put(`/update/${data}`, {
      id: String(data),
      title: inputEditTask,
    });

    setInputEditTask("");
    alert("Tarefa alterada com sucesso!");
  }
  return (
    <form onSubmit={handleEditTask} className="flex flex-col gap-6 mt-9">
      <input
        type="text"
        placeholder="Qual o novo nome da tarefa"
        autoFocus
        value={inputEditTask}
        onChange={(e) => setInputEditTask(e.target.value)}
        className=" bg-gray-600 rounded-lg py-3 text-center placeholder:text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-500"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl p-3 bg-button hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-500"
      >
        <Check size={23} weight="bold" /> Confirmar
      </button>
    </form>
  );
}
