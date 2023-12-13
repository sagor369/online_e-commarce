"use client"
import { Check } from "lucide-react";
import "./stepper.css";

const StepperHeader = ({steps, currentStep, }:any)=>{
    return (
        <div className="flex justify-center">
        {steps?.map((step:any, i:any) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep ) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep ? (
                <Check className="w-6" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
    )
}

export default StepperHeader;