import { useMemo } from "react";

function useTaskFilters(tasks, searchTerm, statusFilter) {
  return useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !task.completed) ||
        (statusFilter === "completed" && task.completed);

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);
}

export default useTaskFilters;