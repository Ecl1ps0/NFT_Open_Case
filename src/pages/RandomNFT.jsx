import { useContext, useState, useEffect } from 'react';
import { ContextNFT } from '../Context/NFTContract';
import { useSelector } from 'react-redux';

const RandomNFT = () => {
	const id = window.location.pathname.replace('/', '');
	const [nft, setNFT] = useState(null);
	const [isOpened, setIsOpened] = useState(false);
	const { getDataById, buyNFT } = useContext(ContextNFT);
	const { credential } = useSelector((state) => state.auth);
	const { data } = useSelector((state) => state.case);

	useEffect(() => {
		(async () => setNFT(await getDataById(id)))();
	}, []);

	const handleBuy = async () => {
		await buyNFT(data).then(setIsOpened(true));
	};

	return (
		<div className='mx-auto container'>
			<div className='w-full flex flex-col items-center mt-32'>
				<img
					className='w-56 h-56'
					src={
						isOpened
							? nft?.image
							: 'https://preview.redd.it/imrpoved-steam-default-avatar-v0-ffxjnceu7vf81.png?width=640&crop=smart&auto=webp&s=0f8cbc4130a94fc83f19418f1a734209108c2a4b'
					}
					alt={nft?.name}
				/>
				<button
					onClick={handleBuy}
					className='px-3 mt-3 text-white font-rubik hover:text-black hover:bg-pink-700 transition-all py-1 bg-pink-400 rounded-md'>
					Let's open it!
				</button>
				{/* <span className='font-rubik text-lime-400'>Price: {nft?.price}</span> */}
			</div>
		</div>
	);
};

export default RandomNFT;
