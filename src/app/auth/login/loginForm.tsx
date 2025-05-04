"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
		<section className='w-full h-screen flex'>
			<div className='w-[60%] h-full xl:flex hidden'>
				<div className="w-full h-full bg-[url('/assets/login-bg.jpeg')] bg-cover bg-center"></div>
			</div>
			<div className='xl:w-[40%] w-full bg-white flex items-center justify-center overflow-y-scroll'>
				<div className='sm:w-[70%] w-[90%] flex flex-col items-start'>
					<Image src={"/assets/logo.svg"} width={60} height={60} alt='logo' />
					<p className='mt-3 sm:text-[32px] text-[24px] font-bold text-[#525252]'>
						Login to your Account
					</p>
					<p className='mt-1 text-base font-normal text-[#525252]'>
						See what is going on with your Workboard
					</p>
					<Formik
						initialValues={{ username: "", password: "" }}
						validationSchema={LoginSchema}
						onSubmit={(values) => {
							handleLogin(values);
						}}>
						{({
							values,
							handleSubmit,
							handleChange,
							handleBlur,
							errors,
							touched,
						}) => (
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
				</div>
			</div>
		</section>
	);
};

export default LoginForm;
