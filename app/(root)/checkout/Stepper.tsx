"use client";
import DeliveryAddress from "./DeliveryAddress";
import OrderSummury from "./OrderSummury";
import Attachment from "./Attachment";

const Stepper = ({ currentStep, nextStep,  }: any) => {
  switch (currentStep) {
    case 1:
      return <DeliveryAddress nextStep={nextStep} />;
    case 2:
      return <OrderSummury />;
    case 3:
      return <Attachment />;
    default:
      return <div></div>;
  }
};

export default Stepper;
