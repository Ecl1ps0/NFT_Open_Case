import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Toaster } from 'react-hot-toast';

import { ProviderNFT } from './Context/NFTContract';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Add = lazy(() => import('./pages/AddNFT'));
const Profile = lazy(() => import('./pages/Profile'));
const NFTRandom = lazy(() => import('./pages/RandomNFT'));

const App = () => {
	return (
		<ProviderNFT>
			<Suspense fallback={<Layout>Loading...</Layout>}>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route
								path='/'
								element={<Home />}
							/>
							<Route
								path='/:id'
								element={<NFTRandom />}
							/>
							<Route
								path='/add'
								element={<Add />}
							/>
							<Route
								path='/profile'
								element={<Profile />}
							/>
							<Route
								path='*'
								element={<Error />}
							/>
						</Routes>
						<Toaster
							position='top-right'
							reverseOrder={false}
						/>
					</Layout>
				</BrowserRouter>
			</Suspense>
		</ProviderNFT>
	);
};

export default App;
