"use client";
import { useState } from "react";
import StepperHeader from "./StepperHeader";
import Stepper from "./Stepper";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const orderProducts = [{}]; //context use kora hoisilo
  const orderInfo = {}; //context use kora hoisilo
  const user = {}; // context use kora hosilo
  const steps = ["Delivery Address", "Order Summury", "Attachment"];
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleOrder = () => {
    console.log(orderInfo);
  };

  return (
    <div className="container mx-auto my-8">
      <StepperHeader steps={steps} currentStep={currentStep} />
      <div className="lg:flex items-start gap-8 justify-between mt-8">
        <div className="lg:w-3/4">
          <Stepper
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
        <PriceDetails cartItems={orderProducts} />
      </div>
      {currentStep > 1 && (
        <div className="mt-5 flex items-center justify-center gap-5">
          <Button className="text-white" onClick={prevStep}>
            Previous
          </Button>
          <Button
            className="text-white"
            onClick={currentStep === 3 ? handleOrder : nextStep}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
