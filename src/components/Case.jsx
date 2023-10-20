import React from 'react';
import bocchi_case from '../assets/bocchi_case.png';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
const Case = () => {
	const { credential } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	return (
		<div
			className='cursor-pointer'
			onClick={(e) => {
				if (!credential) {
					e.stopPropagation();
					toast.error('Please login to the site!!!');
				} else {
					navigate('/test');
				}
			}}
			to='/test'>
			<div className='border-b hover:bg-white hover:bg-opacity-40 hover:-translate-x-2 hover:-translate-y-2 transition-all flex justify-center flex-col border-pink-300  h-64'>
				<img
					src={bocchi_case}
					alt='case'
				/>
				<span className='text-center  text-pink-400'>Bocchi Case</span>
				<span className='text-center text-green-400'>100 ETH</span>
			</div>
		</div>
	);
};

export default Case;
