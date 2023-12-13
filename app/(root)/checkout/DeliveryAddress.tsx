"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const DeliveryAddress = ({ nextStep }: any) => {
  const user:any = {};
  const { toast } = useToast();
  const [allAddress, setAllAddress] = useState(user?.deliveryAddress);
  const userDeliveryAddress = allAddress?.length > 0 ? allAddress[0] : {};
  const [deliveryAddress, setDeliveryAddress] =
    useState<any>(userDeliveryAddress);
  const { register, handleSubmit, reset } = useForm();
  const [newAddress, setNewAddress] = useState(false);
  const initalAddress = {
    _id: null,
    name: "",
    phoneNumber: "",
    pinCode: "",
    city: "",
    state: "",
    address: "",
  };
  const [defaultAddress, setDefaultAddress] = useState(initalAddress);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${user?._id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const addressSubmit = (data: any) => {
    setSubmitLoading(true);
    const address = {
      name: data.name,
      phone: data.phoneNumber,
      pincode: data.pinCode,
      city: data.city,
      state: data.state,
      address: data.address,
    };

    const allRemainingAddress = user?.deliveryAddress;
    fetch(`/api/users/${user?._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        deliveryAddress: [...allRemainingAddress, address],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubmitLoading(false);
      });

    if (defaultAddress._id) {
      const remainingAddress = allAddress.filter(
        (item: any) => item._id !== defaultAddress._id
      );
      setAllAddress([...remainingAddress, address]);
    } else {
      setAllAddress([...allRemainingAddress, address]);
    }
    setDeliveryAddress(address);
    setNewAddress(false);
    setDefaultAddress(initalAddress);
    reset();
  };

  const handleAddressChange = (index: number) => {
    setDeliveryAddress(allAddress[index]);
  };

  const handleNextStep = () => {
    return nextStep(); // deleted
    if (deliveryAddress.pincode) {
      nextStep();
    } else {
      toast({
        variant: "destructive",
        description: "Delivery Address Required",
      });
    }
  };

  return (
    <div>
      {allAddress?.lenght > 0 ? (
        <div className="border p-5 shadow mb-4 md:flex items-center justify-between gap-2">
          <div>
            <h4>
              Deliver To:{" "}
              <span className="font-semibold">{deliveryAddress.name}</span>
            </h4>
            <div className="flex items-center flex-wrap md:gap-2 gap-1">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {deliveryAddress.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Pin Code:</span>{" "}
                {deliveryAddress.pinCode}
              </p>
              <p>
                <span className="font-semibold">City:</span>{" "}
                {deliveryAddress.city}
              </p>
              <p>
                <span className="font-semibold">State:</span>{" "}
                {deliveryAddress.state}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {deliveryAddress.address}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button
              onClick={() => {
                setDefaultAddress(deliveryAddress);
                setNewAddress(true);
              }}
              className="text-white"
            >
              Edit
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" className="text-primary">
                  Change
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Delivery Address</DialogTitle>
                  <DialogDescription>
                    {allAddress.map((item: any, index: number) => (
                      <div
                        key={item._id}
                        onClick={() => handleAddressChange(index)}
                        className={`mt-3 p-2 border cursor-pointer rounded-md ${
                          item._id === deliveryAddress._id &&
                          "bg-primary text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {item.name}
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {item.phoneNumber}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p>
                            <span className="font-semibold">Pin Code:</span>{" "}
                            {item.pinCode}
                          </p>
                          <p>
                            <span className="font-semibold">City:</span>{" "}
                            {item.city}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p>
                            <span className="font-semibold">State:</span>{" "}
                            {item.state}
                          </p>
                          <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {item.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="border p-5 shadow mb-4">No Address Found</div>
      )}

      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            setNewAddress(!newAddress);
            setDefaultAddress(initalAddress);
          }}
          className="text-white"
        >
          {newAddress ? "Cancel" : "Add New Address"}
        </Button>
        <Button className="text-white" onClick={handleNextStep}>
          Continue
        </Button>
      </div>

      {newAddress && (
        <div className="w-full mt-8">
          <h3 className="text-xl mb-3">Add New Address</h3>
          <form onSubmit={handleSubmit(addressSubmit)}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <Input
                placeholder="Name"
                defaultValue={defaultAddress.name}
                className="py-6 outline-none w-full"
                {...register("name")}
                required
              />
              <Input
                placeholder="Phone Number"
                defaultValue={defaultAddress.phoneNumber}
                className="py-6 outline-none w-full"
                {...register("phoneNumber")}
                required
              />
            </div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <Input
                placeholder="Pin Code"
                defaultValue={defaultAddress.pinCode}
                className="py-6 outline-none w-full"
                {...register("pinCode")}
                required
              />
              <Input
                placeholder="City"
                defaultValue={defaultAddress.city}
                className="py-6 outline-none w-full"
                {...register("city")}
                required
              />
            </div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <Input
                placeholder="State"
                defaultValue={defaultAddress.state}
                className="py-6 outline-none w-full"
                {...register("state")}
                required
              />
              <Input
                placeholder="Address"
                defaultValue={defaultAddress.address}
                className="py-6 outline-none w-full"
                {...register("address")}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitLoading}
              className="w-full text-white"
            >
              {submitLoading ? (
                <BtnSpinner />
              ) : defaultAddress._id ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
