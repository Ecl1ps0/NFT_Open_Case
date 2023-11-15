import React from "react";
import info from '../assets/infopic.png';
import back1 from '../assets/back1.png';
import back2 from '../assets/back2.png';
import back3 from '../assets/back3.png';
import back4 from '../assets/back4.png';
const imagesContext = require.context('../assets/collection', false, /\.(png)$/);
const collectionImages = imagesContext.keys().map((imagePath) => {
    const image = imagesContext(imagePath);
    console.log(image); // Log the imported image
    return image;
  });
  

export const Title = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
      <div className="flex-1 h-[2000px] bg-white flex flex-col items-center justify-center relative">
      <img src={back1} alt="Background 1" className="absolute top-0 left-0 object-contain w-1/2 h-1/2 rotate-[-15deg]" />
<img src={back3} alt="Background 2" className="absolute top-0 right-0 object-contain w-1/2 h-1/2 rotate-[15deg]" />
<img src={back2} alt="Background 3" className="absolute bottom-0 left-0 object-contain w-1/3 h-1/3" />
<img src={back4} alt="Background 4" className="absolute bottom-0 right-0 object-contain w-1/3 h-1/3 " />



        <h1 className="text-4xl font-bold mb-14 font-bold text-[#0f0f0f] text-[70px] mt-4">Bocchi the Case</h1>
        <p className="text-sm text-gray-500 font-medium text-[#0f0f0f] text-[25px] ">500 images from the Bocchi the Case</p>
        <div className="mt-20">
          <button className="bg-green-500 text-white py-5 px-40 rounded [font-family:'Inter',Helvetica] font-medium text-[#0f0f0f] text-[18px] text-center">
            Open the Case
          </button>
        </div>
      </div>
      </div>

      <div className="flex-1 bg-blue-500 p-8 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-4 [font-family:'Inter',Helvetica] font-bold text-white text-[46px] text-center">What is Bocchi the Case?</h2>
          <p className="text-white mb-4 [font-family:'Inter',Helvetica] text-white text-[18px] ">
            NFT drop cases, created by IT-2102 Group, aiming to express culture, personality, and individuality of the anime subculture. 
            Through hand-drawn hairstyles, facial expressions, and clothes, Bocchi the Rock characters embraces what 
            it means to be on one ground but having a sense of individuality.
          </p>
        </div>
        
        <div className="md:w-1/5">

          <img
            className="w-full h-auto object-cover rounded"
            src={info}
            alt="Avatar Squad"
          />
        </div>
      </div>


      <div className="flex-1 bg-gray-200 p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Browse our collection</h2>
        
        <div className="grid grid-cols-10 gap-4">
  {collectionImages.map((image, index) => (
    <img
      key={index}
      className="object-cover h-10 w-10 rounded"
      src={image.default} 
      alt={`Image ${index + 1}`}
    />
  ))}
</div>
        </div>
    </div>
  );
};

export default Title;