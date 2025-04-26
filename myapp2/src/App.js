import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // 画面読み込み時に localStorage からデータを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // todos が変わるたびに localStorage に保存する
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // TODOを追加
  const handleAdd = () => {
    if (input.trim() === '') return;
    const newTodo = { id: Date.now(), text: input, done: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  // チェック状態を切り替え
  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // TODOを削除
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App" style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>📝 Todoアプリ</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="やることを入力"
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button onClick={handleAdd} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          追加
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
              style={{ marginRight: '0.5rem' }}
            />
            <span style={{
              flexGrow: 1,
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? 'gray' : 'black'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem' }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;