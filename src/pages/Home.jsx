import Case from '../components/Case';
import Info from '../components/info';

const Home = () => {
	return (
		<main className='p-12 container mx-auto font-rubik justify-center w-full flex flex-wrap gap-5'>
			{new Array(10).fill(0).map((_) => {
				return <Case />;
			})}
			<Info />
		</main>
	);
};

export default Home;
