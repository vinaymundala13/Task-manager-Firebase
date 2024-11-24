import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContent';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TodoList from './TodoList';

const Home = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  // Logout function
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  // Task input change handler
  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  // Submit new task
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (task.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, task]); // Add task to the list
      setTask(''); // Clear input field after adding the task
    }
  };

  // Task deletion handler
  const deleteHandler = (index) => {
    const newTodos = todos.filter((todo, idx) => idx !== index); // Remove task by index
    setTodos(newTodos); // Update the list
  };

  return (
    <div>
      <center>
        <h1>Let's Manage our Tasks</h1>
        <TodoList todolist={todos} deleteHandler={deleteHandler} />
      </center>
      <div className='d-grid gap-2'>
        <Button variant='primary' onClick={handleLogOut}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Home;
