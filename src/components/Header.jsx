import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredential } from '../redux/slices/auth.slice';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import logo from '../assets/logo.png';

const Header = () => {
	const dispatch = useDispatch();
	const handleLogin = async (credential) => {
		dispatch(setCredential(credential));
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const { user, credential } = useSelector((state) => state.auth);

	return (
		<GoogleOAuthProvider clientId={process.env?.REACT_APP_CLIENTID}>
			<header className='w-full flex justify-between h-16 items-center'>
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
				<div className='h-full'>
					{credential ? (
						<div className='h-full gap-2.5 flex items-center mr-2'>
							<img
								src={user.picture}
								alt={user.name}
								className='h-10 w-10 rounded-full'
							/>
							<button
								className='text-white uppercase border border-white px-2 rounded-lg hover:border-pink-300 transition-all hover:text-pink-300'
								onClick={handleLogout}>
								Logout
							</button>
						</div>
					) : (
						<GoogleLogin
							auto_select
							width={50}
							onSuccess={(response) => {
								handleLogin(response.credential);
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/>
					)}
				</div>
			</header>
		</GoogleOAuthProvider>
	);
};

export default Header;
