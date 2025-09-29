import { useState, startTransition, memo, useCallback, useEffect } from "react";

const mockTodos = Array.from({ length: 12000 }, (_, i) => ({
  id: i + 1,
  title: `Todo Item ${i + 1}`,
  completed: i % 2 === 0,
}));

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoItem = memo(function TodoItem({
  todo,
  toggleTodo,
}: {
  todo: Todo;
  toggleTodo: (id: number) => void;
}) {
  console.log("render", todo.id);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.title}
      </label>
    </li>
  );
});

export default function TodoList() {
  const [todos, setTodos] = useState(mockTodos);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [visibleTodos, setVisibleTodos] = useState(mockTodos);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleFilterChange = (newFilter: "all" | "completed" | "active") => {
    // Mark the filter change as low-priority
    startTransition(() => {
      setFilter(newFilter);
    });
  };

  // Compute filtered todos in a deferred update so toggling remains snappy
  useEffect(() => {
    startTransition(() => {
      if (filter === "all") {
        setVisibleTodos(todos);
      } else if (filter === "completed") {
        setVisibleTodos(todos.filter((t) => t.completed));
      } else {
        setVisibleTodos(todos.filter((t) => !t.completed));
      }
    });
  }, [todos, filter]);

  return (
    <div>
      <h2>Todo List (with startTransition)</h2>

      <div>
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
        <button onClick={() => handleFilterChange("active")}>Active</button>
      </div>

      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
}
