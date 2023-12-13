import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const CategoryForm = (props: any) => {
  const {
    handleAddCategory,
    handleSubmit,
    submitLoading,
    update,
    setUpdate,
    defaultValues,
    setDefaultValues,
    register,
  } = props;

  return (
    <div className="bg-white rounded-md border p-5 md:w-2/5 md:mb-0 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">
          {update ? "Update" : "Add New"} Category
        </h3>

        <X
          onClick={() => {
            setUpdate(null);
            setDefaultValues({
              title: "",
              description: "",
              image: "",
            });
          }}
          className={`${update ? "flex" : "hidden"} cursor-pointer`}
        />
      </div>
      <form onSubmit={handleSubmit(handleAddCategory)}>
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

export default CategoryForm;
