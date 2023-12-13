import React from "react";

const GetAnUpdate = () => {
  return (
    <div className="m-4 grid md:grid-cols-2 justify-center items-center bg-[#396874] w-[full] ">

      
      <div className="font-[Poppin ">
        <h1 className="w-full pr-5 text-white font-semibold text-[41.5px]">
          Get Update on Latest Technology <br />& Design
        </h1>
        <h4 className=" text-slate-300 font-normal text-[17.085px] mt-8">
          Tellus elementum sagittis vitae et leo duis ut. Aliquam etiam erat
          velit scelerisque. <br /> Risus nec feugiat in fermentum posuere urna.
          Eu tincidunt tortor aliquam nulla facilisi cras. <br /> Tortor
          dignissim convallis aenean et tortor at risus.
        </h4>
      </div>


      <div>
        <div className="flex gap-3  relative py-4 mx-4">
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

export default GetAnUpdate;
