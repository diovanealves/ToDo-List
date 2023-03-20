import { Notepad } from "phosphor-react";

export function TaskEmpty() {
  return (
    <div className="flex flex-col items-center">
      <Notepad size={60} />
      <h1 className="text-2xl font-bold my-2">
        Você ainda não tem tarefas cadastradas
      </h1>
      <p className="text-lg opacity-60">
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  );
}
