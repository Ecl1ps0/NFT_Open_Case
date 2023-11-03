import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import Test from './components/Test';
import { Toaster } from 'react-hot-toast';

import { ProviderNFT } from './Context/NFTContract';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
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
								path='/test'
								element={<Test />}
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
