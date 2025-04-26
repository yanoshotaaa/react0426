import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: input,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Todoアプリ</h1>

      <div className="flex mb-4">
        <input
          className="flex-grow border rounded p-2"
          type="text"
          placeholder="やることを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          追加
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>{todo.text}</span>
            <button
              className="bg-red-400 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}