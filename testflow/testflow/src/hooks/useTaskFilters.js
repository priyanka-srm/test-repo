import { useMemo } from "react";

function useTaskFilters(tasks, search = "", status = "all") {
  return useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        (status === "active" && !task.completed) ||
        (status === "completed" && task.completed);

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, status]);
}

export default useTaskFilters;
