import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MetaMaskProvider } from '@metamask/sdk-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/* <MetaMaskProvider
			sdkOptions={{
				logging: {
					developerMode: true,
				},
				dappMetadata: {
					name: 'Bocchi the case',
					url: window.location.host,
				},
			}}> */}
		<Provider store={store}>
			<App />
		</Provider>
		{/* </MetaMaskProvider> */}
	</React.StrictMode>
);

reportWebVitals();
