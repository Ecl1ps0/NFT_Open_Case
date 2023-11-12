import { useRef, useState } from 'react';

import './Test.css';

import pointer from '../assets/pointer.png';

const Test = () => {
  const [isStarted, setIsStarted] = useState(false);
  const ulRef = useRef(null);

  const start = () => {
    const move = -150 * (Math.floor(Math.random() * 9) - 2);
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
    <main>
      <section className='body'>
        <div className='app'>
          <img src={pointer} alt='' width={50} height={50} />
          <div className='scopeHidden'>
            <ul ref={ulRef}>
              {new Array(9).fill(0).map((_, idx) => (
                <li key={idx + 1}>
                  <img
                    src={require(`../assets/${idx + 1}.jpg`)}
                    alt={`Image ${idx + 1}`}
                    width={150}
                    height={150}
                  />
                </li>
              ))}
            </ul>
          </div>
          {!isStarted && (
            <button onClick={start} className='btn'>
              Крутить
            </button>
          )}
        </div>
      </section>
      {isStarted && (
        <div className='w-full flex justify-center'>
          <button
            onClick={() => window.location.reload()}
            className='px-3 py-2.5 font-rubik text-white bg-green-800 hover:px-5 transition-all hover:tracking-widest'>
            <span className='hover:w-full hover:h-full'>Повторить ещё</span>
          </button>
        </div>
      )}
    </main>
  );
};

export default Test;
