import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContextNFT } from '../Context/NFTContract';
import { NFT } from '../components/NFT';
const Profile = () => {
	const { credential } = useSelector((state) => state.auth);
	const { myNFTS } = useContext(ContextNFT);
	const [nfts, setNFTS] = useState(null);

	useEffect(() => {
		(async () => {
			const items = await myNFTS();
			setNFTS(items);
		})();
	}, [credential]);

	return (
		<main className='mx-auto container flex font-rubik text-white'>
			<div className='w-1/2 h-36 flex items-center '>
				Wallet Address: {credential}
			</div>
			<div className='w-1/2 py-1 px-2 border-l border-l-pink-500'>
				<div>NFTS</div>
				<section className='w-full mt-3'>
					{nfts?.map((nft) => {
						return (
							<NFT
								description={nft.description}
								id={nft.id}
								key={nft.id}
								image={nft.image}
								price={nft.price}
								name={nft.name}
								seller={nft.seller}
							/>
						);
					})}
				</section>
			</div>
		</main>
	);
};

export default Profile;
