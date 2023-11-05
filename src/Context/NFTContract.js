import { useState, useEffect, useContext } from 'react';
import web3modal from 'web3modal';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { address, abi } from './constants';
import { createContext } from 'react';

import { create as ifpsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import toast from 'react-hot-toast';

const auth = `Basic${Buffer.from(`${2638768}:${'ultimateSecret'}`)}`.toString(
	'base64'
);

const subdomain = '';

const client = ifpsHttpClient({
	host: 'infura-ipfs.io',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization: auth,
	},
});

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
	const { credential } = useSelector((state) => state.auth);

	const uploadToIpfs = async (file) => {
		try {
			const formData = new FormData();

			formData.append('file', file);
			const { data: url } = await axios.post(
				'http://localhost:8080/file-upload',
				formData
			);
			console.log(url);
			return url;
			// const added = await client.add({
			// 	content: file,
			// });
			// const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			// return url;
		} catch (error) {
			console.error(error);
		}
	};

	const createNFT = async (fromInput, fileUrl) => {
		const { name, description, price } = fromInput;
		if (!name || !description || !price) {
			toast.error('Some data is missing');
		}

		const data = {
			name,
			description,
			image: fileUrl,
			price,
			seller: credential,
			owner: credential,
		};
		try {
			const { data: nftData } = await axios.post(
				'http://localhost:8080/file-upload/create',
				data
			);

			const url = `http://localhost:8080/file-upload/${nftData.id}`;

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
				: await contract.resellToken(url, price, {
						value: listingPrice.toString(),
				  });

			await transaction.wait().then(() => toast.success('Created'));
			console.log(transaction);
		} catch (error) {
			toast.error(JSON.stringify(error, null, 2));
		}
	};

	const fetchNfts = async () => {
		try {
			// const { data: items } = await axios.get(
			// 	'http://localhost:8080/file-upload'
			// );

			const contract = await connectingWithContract();
			const data = await contract.getAllNFT();
			let items = await Promise.all(
				data.map(async ({ tokenId, seller, owner, price }) => {
					// console.log(tokenId, seller, owner, price);
					const tokenURI = await contract.tokenURI(tokenId);
					if (!tokenURI.includes('undefined')) {
						const {
							data: { image, name, description, id },
						} = await axios.get(tokenURI);
						return {
							image,
							name,
							description,
							price,
							seller,
							owner,
							id,
						};
					}
				})
			);
			items = items.filter((item) => item);
			items = items.filter((item, index, self) => {
				return item && index === self.findIndex((i) => i.id === item.id);
			});
			return items;
			// return items;
		} catch (error) {
			toast.error('Error happened on fetching nft');
			console.log(error);
		}
	};

	const myNFTS = async (type = 'getMyNFT') => {
		try {
			const contract = await connectingWithContract();

			const data =
				type === 'getMyNFT'
					? await contract.getMyNFT()
					: await contract.getAllNFT();

			let items = await Promise.all(
				data.map(async ({ tokenId, seller, owner, price }) => {
					// console.log(tokenId, seller, owner, price);
					const tokenURI = await contract.tokenURI(tokenId);
					if (!tokenURI.includes('undefined')) {
						const {
							data: { image, name, description, id },
						} = await axios.get(tokenURI);
						return {
							image,
							name,
							description,
							price,
							seller,
							owner,
							id,
						};
					}
				})
			);
			items = items.filter((item) => item);
			items = items.filter((item, index, self) => {
				return item && index === self.findIndex((i) => i.id === item.id);
			});

			return items;
		} catch (error) {
			console.error(error);
		}
	};

	const getDataById = async (id) => {
		const { data } = await axios
			.get(`http://localhost:8080/file-upload/${id}`)
			.catch(() => toast.error('Error happend'));

		return data;
	};

	const buyNFT = async (nft) => {
		try {
			const contract = await connectingWithContract();
			const priceInEther = nft.price.toString(); // Convert the BigNumber to a string
			const price = ethers.utils.parseUnits(priceInEther, 'ether'); // Assuming the price is in 'ether'
			// console.log(price.toString());
			const transaction = await contract.createSale(nft.tokenId, {
				value: price.toString(),
			});

			await transaction.wait();
			toast.success('Successfully bought');
		} catch (error) {
			console.log(error);
			toast.error('Error happened to buy this NFT');
		}
	};

	return (
		<ContextNFT.Provider
			value={{
				uploadToIpfs,
				createNFT,
				fetchNfts,
				myNFTS,
				buyNFT,
				createSale,
				getDataById,
			}}>
			{children}
		</ContextNFT.Provider>
	);
};
