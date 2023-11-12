import Header from './Header';

export const Layout = ({ children }) => {
	return (
		<div className='flex flex-col min-h-screen'>
            <main className='flex-1 w-full bg-zinc-800'>
                <Header />
                {children}
            </main>
        </div>
	);
};
