import { useContext, useRef, useState, useEffect } from 'react';
import { ContextNFT } from '../Context/NFTContract';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';

const AddNFT = () => {
	const { uploadToIpfs, createNFT } = useContext(ContextNFT);
	const fileRef = useRef(null);
	const [image, setImage] = useState(null);
	const [formState, setFormState] = useState({
		name: '',
		price: null,
		description: '',
	});
	const handleUpload = async (e) => {
		const file = e.target.files[0];
		const fileUrl = await uploadToIpfs(file);
		setImage(fileUrl);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createNFT(formState, image)
			.catch((err) => toast.error(err))
			.then(console.log)
			.catch(console.error);
	};

	return (
		<div className='container mx-auto min-h-full py-5'>
			<h1 className='text-center font-rubik text-4xl text-pink-300'>
				Upload NFT
			</h1>
			<div className='text-pink-300 font-rubik mt-2 text-lg text-center'>
				You can set a name, description, price and upload the image
			</div>
			<section className='w-full mt-3'>
				<form onSubmit={handleSubmit}>
					<div className='w-56 mx-auto flex gap-y-3 flex-col'>
						<input
							onChange={(e) =>
								setFormState((prev) => ({ ...prev, name: e.target.value }))
							}
							type='text'
							placeholder='Name'
							className='font-rubik placeholder:text-gray-600 w-full p-1 rounded-md'
						/>
						<textarea
							onChange={(e) =>
								setFormState((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							placeholder='Description'
							className='font-rubik placeholder:text-gray-600 w-full p-1 rounded-md'></textarea>
						<input
							ref={fileRef}
							type='file'
							hidden
							onChange={(e) => handleUpload(e)}
						/>
						{image && (
							<img
								src={image}
								className='w-full'
								alt=''
							/>
						)}
						<button
							className='w-full text-black bg-gray-500 rounded-md py-1 font-rubik'
							onClick={() => {
								fileRef.current.click();
							}}
							type='button'>
							Upload Image
						</button>
						<input
							onChange={(e) =>
								setFormState((prev) => ({ ...prev, price: e.target.value }))
							}
							type='string'
							placeholder='Price'
							className='font-rubik placeholder:text-gray-600 w-full p-1 rounded-md'
						/>
						<Button type='submit'>Upload NFT</Button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default AddNFT;
