import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const ArrivalForm = (props: any) => {
  const {
    register,
    handleSubmit,
    handleAddArrival,
    defaultValues,
    setDefaultValues,
    submitLoading,
    update,
    setUpdate,
  } = props;

  return (
    <div className="bg-white rounded-md border p-5 md:w-2/5 md:mb-0 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">
          {update ? "Update" : "Add New"} Arrival
        </h3>

        <X
          onClick={() => {
            setUpdate(null);
            setDefaultValues({
              name: "",
              min: 0,
              max: 0,
              image: "",
            });
          }}
          className={`${update ? "flex" : "hidden"} cursor-pointer`}
        />
      </div>
      <form onSubmit={handleSubmit(handleAddArrival)}>
        <Input
          placeholder="Name"
          defaultValue={defaultValues.name}
          className="py-6 outline-none mb-4"
          {...register("name")}
          required
        />
        <div className="mb-4 flex items-center justify-between gap-3">
          <Input
            placeholder="Min Price"
            defaultValue={defaultValues.min}
            type="number"
            className="py-6 outline-none"
            {...register("minPrice")}
            required
          />
          <Input
            placeholder="Max Price"
            defaultValue={defaultValues.max}
            type="number"
            className="py-6 outline-none"
            {...register("maxPrice")}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mb-6">
          <Label htmlFor="picture">Arrival Image</Label>
          <Input
            id="picture"
            type="file"
            defaultValue={defaultValues.image}
            {...register("image")}
            accept="image/*"
            required={!update}
            className="w-full"
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

export default ArrivalForm;
