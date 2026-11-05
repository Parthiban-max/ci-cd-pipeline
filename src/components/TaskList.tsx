import React from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-tasks-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Type a task description above and click "Add Task" to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper">
      <ul className="task-list" data-testid="task-list" aria-label="Task List">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : 'pending'}`}
            data-testid={`task-item-${task.id}`}
          >
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                aria-label={`Mark "${task.title}" as ${
                  task.completed ? 'incomplete' : 'complete'
                }`}
              />
              <span className="custom-checkmark" />
            </label>

            <span
              className={`task-title ${task.completed ? 'line-through' : ''}`}
              data-testid="task-title-text"
            >
              {task.title}
            </span>

            <span className="task-badge">
              {task.completed ? 'Completed' : 'Pending'}
            </span>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDeleteTask(task.id)}
              aria-label={`Delete task "${task.title}"`}
              title="Delete task"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
