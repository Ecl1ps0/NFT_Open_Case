import React from 'react';
import bocchi_case from '../assets/bocchi_case.png';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { BigNumber } from 'ethers';
import { setCaseData } from '../redux/slices/case.slice';
const Case = ({ price, name, seller, id, nftDATA }) => {
	const { credential } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const priceof = BigNumber.from(price);
	const navigate = useNavigate();
	return (
		<div
			className={`${
				seller === credential ? 'cursor-not-allowed' : 'cursor-pointer'
			} `}
			onClick={(e) => {
				if (!credential) {
					e.stopPropagation();
					toast.error('Please login to the site!!!');
				} else {
					dispatch(setCaseData(nftDATA));
					navigate(`/${id}`);
				}
			}}
			to={`/${id}`}>
			<div className='border-b hover:bg-white hover:bg-opacity-40 hover:-translate-x-2 hover:-translate-y-2 transition-all flex justify-center flex-col border-pink-300  h-72'>
				<img
					src={bocchi_case}
					alt='case'
				/>
				<span className='text-center  text-pink-400'>{name} Case</span>
				<span className='text-center text-green-400'>
					{priceof / 10 ** 18} ETH
				</span>
				{seller === credential && (
					<span className='text-center  text-yellow-400'>
						You cannot buy it
					</span>
				)}
			</div>
		</div>
	);
};

export default Case;
