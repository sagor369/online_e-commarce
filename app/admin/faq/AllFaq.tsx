import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/adminComponents/Loading/Loading";

const AllFaq = (props: any) => {
  const { isLoading, faq, update, handleUpdate, handleDelete } = props;

  return (
    <div className="bg-white rounded-md border md:w-3/5 max-h-[400px] overflow-auto p-5">
      {isLoading ? (
        <Loading />
      ) : faq?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          No FAQ Found
        </div>
      ) : (
        <Accordion type="single" collapsible>
          {faq.map((item: any) => (
            <AccordionItem key={item._id} value={item._id} className={`${update === item?._id && "bg-gray-300"} p-1`}>
              <AccordionTrigger>{item.question}?</AccordionTrigger>
              <AccordionContent>
                {item.answer}
                <div className="flex items-center gap-2 mt-4 border-t pt-2">
                  <Button
                    onClick={() => {
                      handleUpdate(item);
                    }}
                    className="bg-[#049813] hover:bg-[#088014] text-white"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-[#DB1B1B] hover:bg-red-900 text-white">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="mb-4">
                          Are you sure?
                        </DialogTitle>
                        <DialogDescription>
                          Delete this "{item?.question}" faq
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => {
                              handleDelete(item?._id);
                            }}
                            className="bg-[#DB1B1B] hover:bg-red-900 text-white"
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default AllFaq;
