import { AppDispatch } from "@/app/store/store";
import { setUsers } from "./authSlice";


export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(
            "https://6816f55d26a599ae7c38f59c.mockapi.io/workboard/username"
        );
        const data = await response.json();
        dispatch(setUsers(data));
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};