import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteButton = () => {
  return (
    <Button className="bg-[#DB1B1B] hover:bg-red-700 text-white p-[6px] h-[30px]">
      <Trash2 className="w-3 h-3 mr-1" />
      Delete
    </Button>
  );
};

export default DeleteButton;
