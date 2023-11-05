import Case from '../components/Case';
import { useContext, useState } from 'react';
import { ContextNFT } from '../Context/NFTContract';
import { useEffect } from 'react';
const Home = () => {
	const { fetchNfts } = useContext(ContextNFT);
	const [nft, setNfts] = useState(null);

	useEffect(() => {
		(async () => {
			setNfts(await fetchNfts());
		})();
	}, []);
	return (
		<main className='p-12 container mx-auto font-rubik justify-center w-full flex flex-wrap gap-5'>
			{nft?.map((d) => {
				return (
					<Case
						nftDATA={d}
						id={d.id}
						price={d.price}
						name={d.name}
						key={d.id}
						seller={d.seller}
					/>
				);
			})}
		</main>
	);
};

export default Home;
