"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik } from "formik";

import { login, logout } from "@/app/lib/features/auth/authSlice";
import {
	startLoading,
	stopLoading,
} from "@/app/lib/features/loader/loaderSlice";
import { fetchUsers } from "@/app/lib/features/auth/authActions";
import { RootState, AppDispatch } from "@/app/store/store";
import { SetUserType } from "@/app/types/auth";

import InputField from "@/app/components/elements/inputField";
import { LoginSchema } from "@/app/schemas/loginSchema";
import PasswordToggle from "@/app/components/hoc/passwordToggle";

const LoginForm = () => {
	const router = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const user = useSelector((state: RootState) => state.auth.user);
	const users = useSelector((state: RootState) => state.auth.users);

	const PasswordField = PasswordToggle(InputField);

	useEffect(() => {
		dispatch(fetchUsers());
		if (user) {
			dispatch(startLoading());
			dispatch(logout());
			dispatch(stopLoading());
		}
	}, []);

	const handleLogin = (values: SetUserType) => {
		dispatch(startLoading());

		const user = users.find(
			(u) => u.username === values.username && u.password === values.password
		);
		if (user) {
			dispatch(login({ username: user.username, role: user.role }));
			router.push("/dashboard");
		} else {
			alert("Invalid credentials");
		}
		dispatch(stopLoading());
	};
	return (
<Formik
	initialValues={{ username: "", password: "" }}
	validationSchema={LoginSchema}
	onSubmit={(values) => {
		handleLogin(values);
	}}>
	{({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
		<form onSubmit={handleSubmit} className='w-full'>
			<InputField
				label='username'
				type={"username"}
				name={"username"}
				value={values.username}
				placeholder={"Enter your username"}
				handleChange={handleChange}
				handleBlur={handleBlur}
				error={errors.username}
				touched={touched.username}
				required
				cls='mt-12'
				max={20}
			/>
			<PasswordField
				label='Password'
				name='password'
				value={values.password}
				placeholder='Enter your password'
				handleChange={handleChange}
				handleBlur={handleBlur}
				error={errors.password}
				touched={touched.password}
				required
				cls='mt-4'
				max={20}
			/>

			<button className='mt-12 w-full rounded-md bg-[#7F265B] h-[50px] flex items-center justify-center text-white font-extrabold cursor-pointer'>
				Login
			</button>
		</form>
	)}
</Formik>
	);
};

export default LoginForm;
