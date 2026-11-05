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

      <div className="stat-footer-bar" style={{ gridColumn: '1 / -1', padding: '8px 16px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4f46e5' }}>Productivity Status</span>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{completionPercentage === 100 ? '🎉 All tasks finished!' : `${stats.pending} task(s) remaining`}</span>
      </div>
    </div>
  );
};
