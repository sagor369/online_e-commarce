import { IndianRupee } from "lucide-react";
import { useState, useEffect } from "react";

const PriceDetails = ({ cartItems }: any) => {
  const deliveryFee = 0;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const length = cartItems.length;
    for (let i = 0; i < length; i++) {
      fetch(`/api/products/${cartItems[i].productId}`)
        .then((res) => res.json())
        .then((data: any) => {
          const price =
            data.product.promoPrice > 0
              ? data.product.promoPrice
              : data.product.price;
          setTotalAmount(
            totalAmount + Number(cartItems[i].quantity) * Number(price)
          );
        });
    }
  }, []);

  return (
    <div className="border bg-white shadow p-5 lg:w-1/4 lg:mt-0 mt-5">
      <h3 className="font-semibold text-xl mb-3 border-b pb-2">
        Price Details
      </h3>
      <p className="flex items-center justify-between mb-2">
        Subtotal ({cartItems?.length || 0} items)
        <span className="flex items-center">
          <IndianRupee className="w-4" />
          {totalAmount}
        </span>
      </p>
      <p className="flex items-center justify-between mb-3">
        Delivery Fee{" "}
        <span>
          {deliveryFee === 0 ? (
            "Free"
          ) : (
            <span className="flex items-center">
              <IndianRupee className="w-4" />
              deliveryFee
            </span>
          )}
        </span>
      </p>
      <p className="flex items-center justify-between mb-2 border-t pt-2">
        <span className="font-medium">Total Amount</span>
        <span className="flex items-center">
          <IndianRupee className="w-4" />
          {Number(totalAmount) + Number(deliveryFee)}
        </span>
      </p>
    </div>
  );
};

export default PriceDetails;
