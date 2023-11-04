import { useState, useEffect, useContext } from 'react';
import web3modal from 'web3modal';
import { ethers } from 'ethers';

import { address, abi } from './constants';
import { createContext } from 'react';

import { create as ifpsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import toast from 'react-hot-toast';

const client = ifpsHttpClient('https//ipfs.infura.io:5001/api/v0');

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
	const uploadToIpfs = async (file) => {
		try {
			const added = await client.add({
				content: file,
			});
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			return url;
		} catch (error) {
			console.error(error);
		}
	};

	const createNFT = async (fromInput, fileUrl, router) => {
		const { name, description, price } = fromInput;
		if (!name || !description || !price) {
			toast.error('Some data is missing');
		}

		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});

		try {
			const added = await client.add(data);

			const url = `https://ipfs.infura.io/ipfs/${added.path}`;

			await createSale(url, price);
		} catch (error) {
			console.log(error);
		}
	};

	const createSale = async (url, formInputPrice, isResalling, id) => {
		try {
			const price = ethers.utils.parseUnits(formInputPrice, 'ether');
			const contract = await connectingWithContract();

			const listingPrice = await contract.getListPrice();

			const transaction = !isResalling
				? await contract.createToken(url, price, {
						value: listingPrice.toString(),
				  })
				: await contract.resell();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ContextNFT.Provider value={{ uploadToIpfs, createNFT }}>
			{children}
		</ContextNFT.Provider>
	);
};
