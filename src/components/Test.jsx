import { useRef, useState } from 'react';

import './Test.css';

import pointer from '../assets/pointer.png';

const Test = () => {
	const [isStarted, setIsStarted] = useState(false);
	const ulRef = useRef(null);
	const start = () => {
		const move = -150 * (Math.floor(Math.random() * 10) - 2);
		ulRef.current.style.left = move + 'px';

		const scopeHidden = ulRef.current.parentElement;
		const index =
			-Math.floor((move + scopeHidden.offsetWidth / 2 / -150) / 150) + 1;

		const listItems = ulRef.current.querySelectorAll('li');
		listItems.forEach((li, i) => {
			if (i === index) {
				li.style.background = 'red';
			} else {
				li.style.background = 'transparent';
			}
		});
		setIsStarted(true);
	};

	return (
		<main className='body'>
			<div className='app'>
				<img
					src={pointer}
					alt=''
					width={50}
					height={50}
				/>

				<div className='scopeHidden'>
					<ul ref={ulRef}>
						{new Array(10).fill(0).map((_, idx) => (
							<li key={idx + 1}>{idx + 1}</li>
						))}
					</ul>
				</div>
				<button
					disabled={isStarted}
					onClick={start}
					className='btn'>
					Крутить
				</button>
			</div>
		</main>
	);
};

export default Test;
