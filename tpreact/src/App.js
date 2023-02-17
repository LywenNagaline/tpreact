import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      return savedTodos;
    }
    return []
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    console.log(JSON.stringify(todos))
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), isCompleted:false }]);
      setNewTodo('');
    }
  };

  const handleTodoDelete = (todo) => {
    const tododeleted = todos.filter((t) => t.id !== todo.id);
    setTodos(tododeleted);
  };


  const handleTodoEdit = (todo, newText) => {
    const newTextEdited = [...todos];
    const todoIndex = newTextEdited.findIndex((t) => t.id === todo.id);
    newTextEdited[todoIndex].text = newText;
    setTodos(newTextEdited);
  };

  const handleTodoComplete = todo => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleNewTodoSubmit}>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="text" value={todo.text} onChange={(event) => handleTodoEdit(todo, event.target.value)} />
            
            <input type="checkbox" checked={todo.isCompleted} onChange={(event) => handleTodoComplete(todo)}
        />
            <button onClick={() => handleTodoDelete(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
