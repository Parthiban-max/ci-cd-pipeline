import React, { useState } from 'react';
import { Task, TaskStatsData } from './types/task';
import { TaskStats } from './components/TaskStats';
import { TaskList } from './components/TaskList';
import './App.css';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Configure GitHub Actions CI workflow',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Write automated unit tests with Vitest',
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'task-3',
      title: 'Set up branch protection rules',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [inputTitle, setInputTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = inputTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage('Task title cannot be empty.');
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setInputTitle('');
    setErrorMessage('');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Compute statistics
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const stats: TaskStatsData = {
    total,
    completed,
    pending,
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-badge">Automated CI Pipeline Demo</div>
        <h1>Task Management Dashboard</h1>
        <p className="subtitle">
          React + TypeScript + Vite with Continuous Integration via GitHub Actions
        </p>
      </header>

      <main className="app-main">
        {/* Statistics Dashboard */}
        <section className="section-stats" aria-label="Task Statistics">
          <TaskStats stats={stats} />
        </section>

        {/* Task Input Form */}
        <section className="section-form" aria-label="Add New Task">
          <form className="task-form" onSubmit={handleAddTask} noValidate>
            <div className="input-group">
              <input
                type="text"
                className={`task-input ${errorMessage ? 'input-error' : ''}`}
                placeholder="What needs to be done?"
                value={inputTitle}
                onChange={(e) => {
                  setInputTitle(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                aria-label="New task title"
              />
              <button type="submit" className="btn-add">
                <span className="btn-icon">+</span> Add Task
              </button>
            </div>
            {errorMessage && (
              <p className="error-text" role="alert" data-testid="error-message">
                {errorMessage}
              </p>
            )}
          </form>
        </section>

        {/* Task List */}
        <section className="section-list" aria-label="Task List Section">
          <div className="list-header">
            <h2>Current Tasks</h2>
            <span className="badge-count">{tasks.length} total</span>
          </div>
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>

      <footer className="app-footer">
        <div className="ci-badge">
          <span className="pulse-dot" />
          <span>CI Status: Automated Validation Active</span>
        </div>
        <p className="footer-meta">
          Every Pull Request executes Linting, Vitest Unit Tests, Security Audit & Production Build.
        </p>
      </footer>
    </div>
  );
};

export default App;
