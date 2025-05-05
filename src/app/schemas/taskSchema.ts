import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string().trim(),
    assignee: Yup.string().trim().required("Assignee is required"),
    status: Yup.string().trim().required("Status is required"),
    dueDate: Yup.string().trim().required("Due date is required"),
});