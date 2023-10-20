import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import Test from './components/Test';

const Home = lazy(() => import('./pages/Home'));

const App = () => {
	return (
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
					</Routes>
				</Layout>
			</BrowserRouter>
		</Suspense>
	);
};

export default App;
