import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { setCredential } from '../redux/slices/auth.slice';
import { ethers } from 'ethers';

const Header = () => {
	const dispatch = useDispatch();
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const { credential } = useSelector((state) => state.auth);
	const connect = async () => {
		if (window.ethereum) {
			provider.send('eth_requestAccounts', []).then(async () => {
				dispatch(setCredential(await provider.getSigner().getAddress()));
			});
		} else {
			alert('Please Install MetaMask!!!');
		}
	};

	return (
		<header className='w-full flex justify-between h-16 items-center border-b-2 border-pink-300 bg-zinc-900'>
			<div className='h-full gap-2.5 flex items-center ml-2'>
				<img
					src={logo}
					alt='Bocchi the Case'
					className='h-11 w-11'
				/>
				<div className='text-pink-300 font-rubik uppercase'>
					Bocchi The Case
				</div>
			</div>
			<div className='h-full flex justify-center items-center mr-2'>
				{credential ? (
					<div className='h-7 px-3 py-1 font-rubik flex items-center rounded-md bg-pink-300 '>
						<div>{credential}</div>
					</div>
				) : (
					<button
						onClick={connect}
						className='bg-pink-300 rounded-md px-2 py-1 hover:text-pink-600 transition-all'>
						Connect
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
