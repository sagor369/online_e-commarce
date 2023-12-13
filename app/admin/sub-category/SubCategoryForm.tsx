import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const SubCategoryForm = (props: any) => {
  const {
    register,
    handleSubmit,
    handleAddSubCategory,
    submitLoading,
    update,
    setUpdate,
    parentCategory,
    setParentCategory,
    setParentCategories,
    defaultValues,
    setDefaultValues,
  } = props;
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setParentCategories(data);
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  return (
    <div className="bg-white rounded-md border p-5 md:w-2/5 md:mb-0 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">
          {update ? "Update" : "Add New"} Sub Category
        </h3>

        <X
          onClick={() => {
            setUpdate(null);
            setDefaultValues({
              title: "",
              description: "",
              image: "",
            });
            setParentCategory("");
          }}
          className={`${update ? "flex" : "hidden"} cursor-pointer`}
        />
      </div>
      <form onSubmit={handleSubmit(handleAddSubCategory)}>
        <Input
          placeholder="Category Name"
          className="py-6 outline-none mb-4"
          defaultValue={defaultValues.name}
          {...register("name")}
          required
        />
        <Textarea
          placeholder="Category Description"
          className="outline-none mb-4"
          defaultValue={defaultValues.description}
          {...register("description")}
          required
        />
        <Select
          value={parentCategory}
          onValueChange={(e) => setParentCategory(e)}
          required
        >
          <SelectTrigger className="mb-4 outline-none">
            <SelectValue placeholder="Select Parent Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category: any) => (
              <SelectItem key={category?._id} value={category?._id}>
                {category?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="picture">Category Image</Label>
          <Input
            id="picture"
            type="file"
            defaultValue={defaultValues.image}
            {...register("image")}
            accept="image/*"
            required={!update}
          />
        </div>
        <Button
          type="submit"
          className="text-white w-full"
          disabled={submitLoading}
        >
          {submitLoading ? <BtnSpinner /> : update ? "Update" : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default SubCategoryForm;
