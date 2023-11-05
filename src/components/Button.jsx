import React from 'react';

/**
 * @param {ReactNode} children
 */

export const Button = (props) => {
	return (
		<button
			{...props}
			className='w-full hover:text-black hover:bg-pink-600 px-1.5 h-7 bg-pink-400 text-white rounded-md font-rubik font-medium'>
			{props.children}
		</button>
	);
};
