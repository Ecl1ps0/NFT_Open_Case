import Header from './Header';

export const Layout = ({ children }) => {
	return (
		<main className='min-h-screen w-full bg-zinc-900'>
			<Header />
			{children}
		</main>
	);
};
