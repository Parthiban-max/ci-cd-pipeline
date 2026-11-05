import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Task Management Application - CI Unit Test Suite', () => {
  it('renders application title, form, and initial statistics correctly', () => {
    render(<App />);

    // Check main dashboard heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Task Management Dashboard'
    );

    // Check initial statistics dashboard (initial default state: 3 tasks, 2 completed, 1 pending)
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('3');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('1');
  });

  it('displays tasks correctly in the list', () => {
    render(<App />);

    // Default tasks rendered
    expect(
      screen.getByText('Configure GitHub Actions CI workflow')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Write automated unit tests with Vitest')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Set up branch protection rules')
    ).toBeInTheDocument();

    const taskItems = screen.getAllByRole('listitem');
    expect(taskItems).toHaveLength(3);
  });

  it('successfully adds a new task and updates statistics', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByRole('button', { name: /\+ add task/i });

    // Type new task and click Add
    await user.type(input, 'Implement pull request status checks');
    await user.click(addButton);

    // Verify task is added to the list
    expect(
      screen.getByText('Implement pull request status checks')
    ).toBeInTheDocument();

    // Verify input is cleared
    expect(input).toHaveValue('');

    // Verify updated task counts: Total = 4, Pending = 2, Completed = 2
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('4');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('2');
  });

  it('prevents empty task submissions and displays an error message', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButton = screen.getByRole('button', { name: /\+ add task/i });
    const initialTotal = screen.getByTestId('total-tasks-count').textContent;

    // Attempt to submit empty input
    await user.click(addButton);

    // Verify error message is displayed
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Task title cannot be empty.');

    // Attempt whitespace-only submission
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '    ');
    await user.click(addButton);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Task title cannot be empty.'
    );

    // Total tasks count should remain unchanged
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent(initialTotal!);
  });

  it('marks a task as completed and toggles back correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially: 2 completed, 1 pending (task 3 is pending)
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('1');

    // Find checkbox for 'Set up branch protection rules'
    const pendingCheckbox = screen.getByRole('checkbox', {
      name: /mark "set up branch protection rules" as complete/i,
    });
    expect(pendingCheckbox).not.toBeChecked();

    // Toggle to completed
    await user.click(pendingCheckbox);
    expect(pendingCheckbox).toBeChecked();

    // Verify stats update: 3 completed, 0 pending
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('3');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('0');

    // Toggle back to pending
    await user.click(pendingCheckbox);
    expect(pendingCheckbox).not.toBeChecked();

    // Verify stats return: 2 completed, 1 pending
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('1');
  });

  it('deletes a task and updates task counts accordingly', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Delete the first task ('Configure GitHub Actions CI workflow' - completed)
    const deleteButton = screen.getByRole('button', {
      name: /delete task "configure github actions ci workflow"/i,
    });
    await user.click(deleteButton);

    // Verify task is removed
    expect(
      screen.queryByText('Configure GitHub Actions CI workflow')
    ).not.toBeInTheDocument();

    // Verify stats update: Total = 2, Completed = 1, Pending = 1
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('1');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('1');
  });

  it('correctly calculates completed and pending task counts when all tasks are deleted', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Delete all 3 initial tasks
    const deleteButtons = screen.getAllByRole('button', { name: /delete task/i });
    for (const btn of deleteButtons) {
      await user.click(btn);
    }

    // Verify empty state is rendered
    expect(screen.getByTestId('empty-tasks-state')).toBeInTheDocument();
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();

    // Verify counts are zero
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('0');
  });
});
