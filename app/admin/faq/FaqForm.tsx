import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const FaqForm = (props: any) => {
  const {
    register,
    handleSubmit,
    handleAddFaq,
    defaultValues,
    setDefaultValues,
    submitLoading,
    update,
    setUpdate,
  } = props;

  return (
    <div className="bg-white rounded-md border p-5 md:w-2/5 md:mb-0 mb-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">{update ? "Update" : "Add New"} FAQ</h3>

        <X
          onClick={() => {
            setUpdate(null);
            setDefaultValues({
              question: "",
              answer: "",
            });
          }}
          className={`${update ? "flex" : "hidden"} cursor-pointer`}
        />
      </div>
      <form onSubmit={handleSubmit(handleAddFaq)}>
        <Input
          placeholder="Question"
          defaultValue={defaultValues.question}
          className="py-6 outline-none mb-4"
          {...register("question")}
          required
        />
        <Textarea
          placeholder="Answer"
          defaultValue={defaultValues.answer}
          className="outline-none mb-4"
          {...register("answer")}
          required
        />
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

export default FaqForm;
