import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todolist, setTodoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTask, setNewTask] = useState("");  // New state to hold the input for new task
  const tasksPerPage = 5;

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10"); // Limit to 10 tasks
        const data = await response.json();
        setTodoList(data.map((item) => item.title)); // Extract only titles
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Calculate tasks to display for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = todolist.slice(indexOfFirstTask, indexOfLastTask);

  // Delete a task
  const deleteHandler = (index) => {
    const updatedList = todolist.filter((_, idx) => idx !== index);
    setTodoList(updatedList);
  };

  // Open edit modal
  const openEditModal = (index) => {
    setEditIndex(index);
    setEditText(todolist[index]);
  };

  // Save edited task
  const saveEdit = () => {
    const updatedList = [...todolist];
    updatedList[editIndex] = editText;
    setTodoList(updatedList);
    closeEditModal();
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditIndex(null);
    setEditText("");
  };

  // Handle adding a new task
  const addTaskHandler = () => {
    if (newTask.trim()) {
      setTodoList([...todolist, newTask]);  // Add the new task to the list
      setNewTask("");  // Clear the input field
    }
  };

  // Pagination Handlers
  const handleNext = () => {
    if (currentPage < Math.ceil(todolist.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    taskList: {
      margin: '20px 0',
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
    },
    taskText: {
      flex: '1',
      textAlign: 'left',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
    },
    deleteButton: {
      padding: '5px 10px',
      color: '#fff',
      backgroundColor: '#ff6b6b',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    editButton: {
      padding: '5px 10px',
      color: '#fff',
      backgroundColor: '#6b9eff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paginationButton: {
      padding: '5px 10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
      cursor: 'pointer',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task Management</h2>
      {/* Add Task Input */}
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={addTaskHandler} style={styles.editButton}>
          Add Task
        </button>
      </div>
      
      <div style={styles.taskList}>
        {currentTasks.map((todo, index) => (
          <div key={index} style={styles.taskItem}>
            <div style={styles.taskText}>{todo}</div>
            <div style={styles.buttons}>
              <button
                style={styles.editButton}
                onClick={() => openEditModal(indexOfFirstTask + index)}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => deleteHandler(indexOfFirstTask + index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.paginationButton,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          style={{
            ...styles.paginationButton,
            cursor:
              currentPage === Math.ceil(todolist.length / tasksPerPage)
                ? 'not-allowed'
                : 'pointer',
          }}
          onClick={handleNext}
          disabled={currentPage === Math.ceil(todolist.length / tasksPerPage)}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editIndex !== null && (
        <>
          <div style={styles.overlay} onClick={closeEditModal}></div>
          <div style={styles.modal}>
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={saveEdit} style={{ ...styles.editButton, marginRight: '10px' }}>
              Save
            </button>
            <button onClick={closeEditModal} style={styles.deleteButton}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
