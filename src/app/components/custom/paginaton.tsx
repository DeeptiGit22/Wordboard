import Image from "next/image";
import { PaginationProps } from "@/app/types/elements";
import SelectField from "../elements/selectField";
import { Rows } from "@/app/constant/config";

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	rowPerPage,
	totalItems,
	onPageChange,
	handleRowChange,
}) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const lastPage = pages.length;

	const start =
		totalItems === 0 ? 0 : (currentPage - 1) * Number(rowPerPage) + 1;
	const end = Math.min(currentPage * Number(rowPerPage), totalItems);

	const isNavigationDisabled = totalItems <= Number(rowPerPage);

	return (
		<div className='flex justify-between mt-4 flex-wrap gap-4'>
			<div className='flex items-center'>
				<p className='mr-2'>Rows per page:</p>
				<SelectField
					options={Rows}
					value={rowPerPage}
					onChange={handleRowChange}
				/>
			</div>

			<div className='flex gap-2 justify-end items-center flex-wrap'>
				<p className='text-sm text-gray-700'>
					{start} - {end} of {totalItems}
				</p>

				<button
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1 || isNavigationDisabled}
					className=' cursor-pointer cursor-pointer border-1 border-[#7F265B] rounded-full p-1.5 disabled:border-[#525252]'>
					<Image
						src={
							currentPage === 1 || isNavigationDisabled
								? "/assets/first.svg"
								: "/assets/first-colored.svg"
						}
						alt='first'
						width={15}
						height={15}
					/>
				</button>

				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1 || isNavigationDisabled}
					className=' cursor-pointer cursor-pointer border-1 border-[#7F265B] rounded-full p-1.5 disabled:border-[#525252]'>
					<Image
						src={
							currentPage === 1 || isNavigationDisabled
								? "/assets/prev.svg"
								: "/assets/prev-colored.svg"
						}
						alt='prev'
						width={15}
						height={15}
					/>
				</button>

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages || isNavigationDisabled}
					className=' cursor-pointer cursor-pointer border-1 border-[#7F265B] rounded-full p-1 disabled:border-[#525252]'>
					<Image
						src={
							currentPage === totalPages || isNavigationDisabled
								? "/assets/next.svg"
								: "/assets/next-colored.svg"
						}
						alt='last'
						width={18}
						height={18}
					/>
				</button>

				<button
					onClick={() => onPageChange(lastPage)}
					disabled={currentPage === totalPages || isNavigationDisabled}
					className='cursor-pointer cursor-pointer border-1 border-[#7F265B] rounded-full p-1 disabled:border-[#525252]'>
					<Image
						src={
							currentPage === totalPages || isNavigationDisabled
								? "/assets/last.svg"
								: "/assets/last-colored.svg"
						}
						alt='last'
						width={18}
						height={18}
					/>
				</button>
			</div>
		</div>
	);
};

export default Pagination;
