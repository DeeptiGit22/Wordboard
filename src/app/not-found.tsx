import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center p-4'>
			<Image src={"/assets/not-found.jpg"} alt={"not found"} width={500} height={500} />
<Link className="text-[#525252] font-medium bg-gray-100 px-4 py-2 rounded-xl cursor-pointer" href={"/"}>Back to Login</Link>
		</div>
	);
}
