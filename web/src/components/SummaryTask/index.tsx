import { useEffect, useState } from "react";
import { Trash } from "phosphor-react";

import { api } from "../../lib/axios";
import { TaskEmpty } from "../TaskEmpty";

type SummaryTask = Array<{
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}>;

export function SummaryTask() {
  const [summary, setSummary] = useState<SummaryTask>([]);

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
            className="flex flex-1 justify-between items-center px-6 py-4 bg-black rounded-lg"
          >
            <div className="flex gap-5">
              <input type="checkbox" className="w-4" />
              <h1 className=" font-bold">{task.title}</h1>
            </div>
            <button>
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
