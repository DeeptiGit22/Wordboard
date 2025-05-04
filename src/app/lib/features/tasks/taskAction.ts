import { AppDispatch } from "@/app/store/store";
import { setTasks } from "./taskSlice";
import { startLoading, stopLoading } from "../loader/loaderSlice";

export const fetchTasks = (role: string | undefined, username: string | undefined) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoading());
        const tasksFromStorage = localStorage.getItem("tasks");
        const tasks = tasksFromStorage ? JSON.parse(tasksFromStorage) : [];

        if (tasks.length > 0) {
            dispatch(setTasks({ tasks, role, username }));
            dispatch(stopLoading());
        } else {
            try {
                const res = await fetch("/mock-data/tasks.json");
                const tasksFromApi = await res.json();
                dispatch(setTasks({ tasks: tasksFromApi, role, username }));
                localStorage.setItem("tasks", JSON.stringify(tasksFromApi));
            } catch (err) {
                console.error("Error loading task data:", err);
            } finally {
                dispatch(stopLoading());
            }
        }
    };
};

