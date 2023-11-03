import React from 'react';

const Error = () => {
	return (
		<div className='w-full justify-center flex'>
			<div className='w-full container mx-auto fixed -z-99 top-18 bg-Error bg-center h-full flex flex-col justify-center items-center'>
				<div className='font-rubik text-6xl text-red-500 px-5 py-3 border-b tracking-wider bg-white bg-opacity-30'>
					ERROR!!! PAGE NOT FOUND
				</div>
			</div>
		</div>
	);
};

export default Error;
