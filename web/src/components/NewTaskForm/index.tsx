import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";

import { api } from "../../lib/axios";

export function NewTaskForm() {
  const [title, setTitle] = useState("");

  async function createNewTask(event: FormEvent) {
    event.preventDefault();

    if (!title) {
      return alert("Erro na criação do hábito");
    }

    await api.post("todo", {
      title,
    });

    setTitle("");
    alert("Task criado com sucesso!");
  }

  return (
    <form onSubmit={createNewTask} className="">
      <input
        type="text"
        placeholder="Adicione uma nova Tarefa"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit" className="">
        Criar
        <PlusCircle />
      </button>
    </form>
  );
}
