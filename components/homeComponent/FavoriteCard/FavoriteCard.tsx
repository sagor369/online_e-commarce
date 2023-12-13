import React from "react";
interface Product {
  id?: number;
  name: string;
  price: number;
  bgcolor: string;
  imageUrl: string;
}
const FavoriteCard: React.FC<Product> = ({
  name,
  price,
  bgcolor,
  imageUrl,
}) => {
  return (
    <div
      className="rounded-[10px] flex justify-between h-[232.315px] overflow-hidden "
      style={{ background: `${bgcolor}` }}
    >
      <div className="pl-[41px] mt-[58px] flex flex-col flex-nowrap  flex-[0_0_220px]">
        <h3 className="text-[#FFF] font-[Poppins] text-[29.595px] not-italic font-semibold leading-[normal]">
          {name}
        </h3>
        <p className="text-[#FFF] font-[Poppins] text-[29.595px] not-italic font-semibold leading-[normal]">
          from Rs {price}
        </p>
        <button className="w-[95.91px] mt-[18px] px-[4px] py-[6px] rounded-[10px] bg-[#4891A3] text-[#000] font-[Inter] text-[17.903px] not-italic font-normal leading-[normal]">
          Shop Now
        </button>
      </div>
      <img
        src={imageUrl}
        alt="favoriteimage"
        className="py-[12px] max-w-full h-auto  "
      />
    </div>
  );
};

export default FavoriteCard;
