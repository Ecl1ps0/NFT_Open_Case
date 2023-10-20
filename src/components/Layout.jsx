import Header from './Header';

export const Layout = ({ children }) => {
	return (
		<main className='min-h-screen w-full bg-zinc-800'>
			<Header />
			{children}
		</main>
	);
};
