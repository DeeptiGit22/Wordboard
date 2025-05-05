import Image from "next/image";
import LoginForm from "./auth/login/loginForm";

export default function LoginPage() {
	return (
		<section className='w-full h-screen flex overflow-y-hidden'>
			<div className='w-[60%] h-full xl:flex hidden'>
				<div className="w-full h-full bg-[url('/assets/login-bg.jpeg')] bg-cover bg-center"></div>
			</div>
			<div className='xl:w-[40%] w-full bg-white flex items-center justify-center overflow-y-scroll'>
				<div className='sm:w-[70%] w-[90%] flex flex-col items-start'>
					<Image src={"/assets/logo.svg"} width={60} height={60} alt='logo' />
					<h1 className='mt-3 sm:text-[32px] text-[24px] font-bold text-[#525252]'>
						Login to your Account
					</h1>
					<p className='mt-1 text-base font-normal text-[#525252]'>
						See what is going on with your Workboard
					</p>
					<LoginForm />
				</div>
			</div>
		</section>
	);
}
