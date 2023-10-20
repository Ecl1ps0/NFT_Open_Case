import { Link } from 'react-router-dom';
import bocchi_case from '../assets/bocchi_case.png';

const Home = () => {
	return (
		<main className='p-12 container mx-auto font-rubik justify-center w-full flex flex-wrap gap-5'>
			{new Array(10).fill(0).map((_) => {
				return (
					<Link to='/test'>
						<div className='border-b hover:bg-white hover:bg-opacity-40 hover:-translate-x-2 hover:-translate-y-2 transition-all flex justify-center flex-col border-pink-300  h-64'>
							<img
								src={bocchi_case}
								alt='case'
							/>
							<span className='text-center  text-pink-400'>Bocchi Case</span>
							<span className='text-center text-green-400'>100 ETH</span>
						</div>
					</Link>
				);
			})}
		</main>
	);
};

export default Home;
