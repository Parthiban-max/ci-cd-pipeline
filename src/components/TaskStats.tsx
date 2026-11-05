import React from 'react';
import { TaskStatsData } from '../types/task';

interface TaskStatsProps {
  stats: TaskStatsData;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-grid" data-testid="task-stats">
      <div className="stat-card total">
        <div className="stat-header">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-icon" aria-hidden="true">📋</span>
        </div>
        <div className="stat-value" data-testid="total-tasks-count">
          {stats.total}
        </div>
        <p className="stat-desc">All tracked items</p>
      </div>

      <div className="stat-card completed">
        <div className="stat-header">
          <span className="stat-label">Completed</span>
          <span className="stat-icon" aria-hidden="true">✅</span>
        </div>
        <div className="stat-value" data-testid="completed-tasks-count">
          {stats.completed}
        </div>
        <p className="stat-desc">
          {completionPercentage}% complete
        </p>
      </div>

      <div className="stat-card pending">
        <div className="stat-header">
          <span className="stat-label">Pending</span>
          <span className="stat-icon" aria-hidden="true">⏳</span>
        </div>
        <div className="stat-value" data-testid="pending-tasks-count">
          {stats.pending}
        </div>
        <p className="stat-desc">Remaining to do</p>
      </div>
    </div>
  );
};
