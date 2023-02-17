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

  // Gère la synchro du localstorage
  useEffect(() => {
    console.log(JSON.stringify(todos))
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //Gère du fetch des todos initiales
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    const data = await response.json()
    setTodos(data)
    }
    fetchData()
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title: newTodo.trim(), completed:false }]);
      setNewTodo('');
    }
  };

  const handleTodoDelete = (todo) => {
    const tododeleted = todos.filter((t) => t.id !== todo.id);
    setTodos(tododeleted);
  };


  const handleTodoEdit = (todo, newtitle) => {
    const newtitleEdited = [...todos];
    const todoIndex = newtitleEdited.findIndex((t) => t.id === todo.id);
    newtitleEdited[todoIndex].title = newtitle;
    setTodos(newtitleEdited);
  };

  const handleTodoComplete = todo => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleNewTodoSubmit}>
        <input type="title" value={newTodo} onChange={handleNewTodoChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="title" value={todo.title} onChange={(event) => handleTodoEdit(todo, event.target.value)} />
            
            <input type="checkbox" checked={todo.completed} onChange={(event) => handleTodoComplete(todo)}
        />
            <button onClick={() => handleTodoDelete(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
