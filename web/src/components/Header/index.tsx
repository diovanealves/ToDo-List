import { NewTaskForm } from "../NewTaskForm";
import { SummaryTask } from "../SummaryTask";

export function Header() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <NewTaskForm />
      <SummaryTask />
    </div>
  );
}
