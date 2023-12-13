import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type faq = {
  question:string,
  answer:string,
  _id:string
}

const UserFAQ = ({ faqData }: { faqData: any }) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((data:faq, i:number ) => (
          <AccordionItem key={data._id} value={`item-${i}`}>
            <AccordionTrigger>
              {data.question}
            </AccordionTrigger>
            <AccordionContent>
              {data.answer}
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* <AccordionItem value="item-2">
        <AccordionTrigger></AccordionTrigger>
        <AccordionContent>
       
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger></AccordionTrigger>
        <AccordionContent>
        
        </AccordionContent>
      </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default UserFAQ;
