import { useState, useEffect, useContext } from 'react';
import web3modal from 'web3modal';
import { ethers } from 'ethers';

import { address, abi } from './constants';
import { createContext } from 'react';

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(address, abi, signerOrProvider);

const connectingWithContract = async () => {
	try {
		const web3Modal = new web3modal();
		const connection = await web3Modal.connect();
		const provder = new ethers.providers.Web3Provider(connection);
		const signer = provder.getSigner();

		const contract = fetchContract(signer);

		return contract;
	} catch (error) {
		console.log(error);
	}
};

export const ContextNFT = createContext();

export const ProviderNFT = ({ children }) => {
	const checkContract = async () => {
		const contract = await connectingWithContract();
		console.log(contract);
		return contract;
	};

	return (
		<ContextNFT.Provider value={{ checkContract }}>
			{children}
		</ContextNFT.Provider>
	);
};
