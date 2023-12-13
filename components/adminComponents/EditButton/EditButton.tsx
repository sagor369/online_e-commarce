import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditButton = () => {
  return (
    <Button className="bg-[#049813] hover:bg-[#088014] text-white p-[6px] h-[30px]">
      <Pencil className="w-3 h-3 mr-1" />
      Edit
    </Button>
  );
};

export default EditButton;
