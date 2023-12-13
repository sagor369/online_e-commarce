"use client";

import SectionTitle from "@/components/share/SectionTitle";
import { useEffect, useState } from "react";
import ShopsCard from "../ShopsByCard/ShopsCard";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

interface Product {
  id: number;
  name: string;
  price: number;
  bgcolor: string;
  imageUrl: string;
}
const PhotoGift = () => {
  const [items, setItems] = useState<number>(8);
  const [Data, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const Data: Product[] = [
  //   {
  //     id: 1,
  //     name: "T Shirts",
  //     price: 399,
  //     bgcolor: "#715A35",
  //     imageUrl: "/images/Favorite/1.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Hoodies",
  //     price: 599,
  //     bgcolor: "#212645",
  //     imageUrl: "/images/Favorite/2.png",
  //   },
  //   {
  //     id: 3,
  //     name: "Polos",
  //     price: 499,
  //     bgcolor: "#715A35",
  //     imageUrl: "/images/Favorite/3.png",
  //   },
  //   {
  //     id: 4,
  //     name: "Mugs",
  //     price: 199,
  //     bgcolor: "#C46921",
  //     imageUrl: "/images/Favorite/4.png",
  //   },
  //   {
  //     id: 8,
  //     name: "Photo Pillows",
  //     price: 299,
  //     bgcolor: "#94645F",
  //     imageUrl: "/images/Favorite/6.png",
  //   },
  //   {
  //     id: 7,
  //     name: "T Shirts",
  //     price: 399,
  //     bgcolor: "#715A35",
  //     imageUrl: "/images/Favorite/1.png",
  //   },
  //   {
  //     id: 9,
  //     name: "Hoodies",
  //     price: 599,
  //     bgcolor: "#212645",
  //     imageUrl: "/images/Favorite/2.png",
  //   },
  //   {
  //     id: 5,
  //     name: "Bags",
  //     price: 599,
  //     bgcolor: "#C3B6A4",
  //     imageUrl: "/images/Favorite/5.png",
  //   },
  //   {
  //     id: 10,
  //     name: "Polos",
  //     price: 499,
  //     bgcolor: "#715A35",
  //     imageUrl: "/images/Favorite/3.png",
  //   },
  //   {
  //     id: 6,
  //     name: "Photo Pillows",
  //     price: 299,
  //     bgcolor: "#94645F",
  //     imageUrl: "/images/Favorite/6.png",
  //   },
  // ];
  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false);
        }
        const items = data.filter((item: any) => item.isPhotoGift == true);

        setPhotoData(items);
      });
  }, []);
  return (
    <div className="my-16 container mx-auto ">
      <div className="flex justify-between items-center mb-10">
        <SectionTitle title="Photo gift"></SectionTitle>
        {Data.length > 8 && (
          <div>
            {items > 8 ? (
              <button
                onClick={() => setItems(8)}
                className="border border-multi-primary py-2 px-3 text-multi-primary"
              >
                Less more
              </button>
            ) : (
              <button
                onClick={() => setItems(Data.length + 1)}
                className="border border-multi-primary py-2 px-3 text-multi-primary"
              >
                Show more
              </button>
            )}
          </div>
        )}
      </div>
      {loading && (
          <div className="flex justify-center">
            <PageLoading></PageLoading>
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-4">
        {Data.slice(0, items).map((item: any) => (
          <ShopsCard item={item}></ShopsCard>
        ))}
      </div>
    </div>
  );
};

export default PhotoGift;
