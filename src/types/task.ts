export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskStatsData {
  total: number;
  completed: number;
  pending: number;
}
