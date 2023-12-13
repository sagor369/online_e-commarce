import React from 'react';

const GetUpdate = () => {
    return (
        <div className='grid md:grid-cols-2   bg-[#396874] w-full text-white p-7'>
            <div className='p-4'>
                <h1 className='text-4xl font-bold'>Get Update on Latest Technology <br />& Design</h1>
                <h2 className='text-[17.085px] mt-5'> Tellus elementum sagittis vitae et leo duis ut. Aliquam etiam erat
                    velit scelerisque. <br /> Risus nec feugiat in fermentum posuere urna.
                    Eu tincidunt tortor aliquam nulla facilisi cras. <br /> Tortor
                    dignissim convallis aenean et tortor at risus.</h2>
            </div>


            <div className='flex justify-center items-center mt-4'>
            <div className="flex gap-3 mb-4 relative">
          <input
            type="text"
            className="border-b-2 font-[Poppins] border-[#D9D9D9] focus:outline-none focus:border-white py-2 px-4 block appearance-none bg-transparent w-[367.304px] h-[2.441px] pb-5"
            placeholder="Mail ID Here"
          />
          <div>
            <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="47"
              viewBox="0 0 48 47"
              fill="none"
            >
              <ellipse
                cx="23.9751"
                cy="22.001"
                rx="23"
                ry="21"
                transform="rotate(-0.809695 23.9751 22.001)"
                fill="#D9D9D9"
              />
              <path
                d="M25.0001 5.98521L8.99866 33.2272L22.8759 27.1324M25.0001 5.98521L35.5637 32.88L22.8759 27.1324M25.0001 5.98521L22.8759 27.1324"
                stroke="black"
                stroke-width="1.78823"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            </button>
          </div>
        </div>
            </div>

        </div>
    );
};

export default GetUpdate;