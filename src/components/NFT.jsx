import { useContext } from 'react';
import { ContextNFT } from '../Context/NFTContract';
import { Button } from './Button';
import { BigNumber } from 'ethers';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
export const NFT = ({ id, image, name, description, price, seller }) => {
	const { createSale } = useContext(ContextNFT);
	const { credential } = useSelector((state) => state.auth);
	const handleSale = async () => {
		const bignumber = BigNumber.from(price);
		const ethValue = bignumber / 10 ** 18;
		const url = `http://localhost:8080/file-upload/${id}`;
		await toast
			.promise(createSale(url, ethValue.toString(), true), {
				error: (err) => err,
				success: 'On resale',
				loading: 'LOADING...',
			})
			.then(console.log);
	};

	return (
		<div
			key={id}
			className='w-full gap-2.5 flex items-center'>
			<img
				src={image}
				className='w-32'
				alt={name}
			/>
			<div className='w-full flex flex-col'>
				{seller === credential && (
					<span className='text-amber-400'>On sale by you</span>
				)}
				<span>Name: {name}</span>

				<span>Description: {description}</span>
				<div className='w-36'>
					<Button onClick={handleSale}>Sell</Button>
				</div>
			</div>
		</div>
	);
};
