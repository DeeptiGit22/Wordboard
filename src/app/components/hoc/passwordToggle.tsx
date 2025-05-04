import React, { useState } from "react";
import Image from "next/image";
import { InputFieldType } from "@/app/types/elements";


const PasswordToggle = (
	WrappedComponent: React.ComponentType<InputFieldType>
) => {
	const PasswordToggleComponent: React.FC<InputFieldType> = (props) => {
		const [isHidden, setIsHidden] = useState(true);

		const handleToggle = () => {
			setIsHidden(!isHidden);
		};

		return (
			<div style={{ position: "relative" }}>
				<WrappedComponent {...props} type={isHidden ? "password" : "text"} />
				<Image
					src={isHidden ? "/assets/unlock.svg" : "/assets/lock.svg"}
					alt='toggle'
					width={20}
					height={20}
					onClick={handleToggle}
					className='absolute right-3 top-12.5 -translate-y-1/2 bg-transparent cursor-pointer'
				/>
			</div>
		);
	};

	PasswordToggleComponent.displayName = "PasswordToggleComponent";
	return PasswordToggleComponent;
};

export default PasswordToggle;
