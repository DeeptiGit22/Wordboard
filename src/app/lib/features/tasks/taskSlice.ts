import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/app/store/store';
import { Task, Tasks, TaskState } from '@/app/types/tasks';

const initialState: TaskState = {
    tasks: [],
};
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<{ tasks: Tasks[], role?: string, username?: string }>) => {
            const { tasks, role, username } = action.payload;
            if (role === 'admin') {
                state.tasks = tasks;
            } else if (role === 'user') {
                state.tasks = tasks.filter(task => task.assignee === username);
            }
        },
        addTask(state, action: PayloadAction<Task>) {
            const maxId = state.tasks.reduce((max: number, task: Tasks) => (task.id > max ? task.id : max), 0);
            const newId = maxId + 1;
            const newTask = {
                ...action.payload,
                id: newId,
            };
            state.tasks.push(newTask);
        },
        editTask(state, action: PayloadAction<Task>) {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...action.payload,
                };
            }
        },
        deleteTask(state, action: PayloadAction<number | undefined>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },

    },
});

export const { setTasks, addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;
