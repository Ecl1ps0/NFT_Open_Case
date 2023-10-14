import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setCredential } from './redux/slices/auth.slice';
import { Layout } from './components';
import Test from './components/Test';

const Home = lazy(() => import('./pages/Home'));

const App = () => {
	const { credential } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!credential && localStorage.getItem('credential')) {
			dispatch(setCredential(localStorage.getItem('credential')));
		}
	}, [credential, dispatch]);

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
