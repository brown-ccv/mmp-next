import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
import { addActivityData } from "../firebase";
import { FormInput } from "./input/FormInput";
import { Textarea } from "./input/Textarea";
import Button from "./Button";

export interface Inputs {
  name: string;
  institution: string;
  email: string;
  description: string;
}

interface DataFormProps {
  /** The external repository URL to open in a new tab after submission */
  dataPath: string;
}

/**
 * Form that records user information to Firebase and opens the data
 * repository URL in a new tab upon successful submission.
 */
export const DataForm = ({ dataPath }: DataFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const router = useRouter();

  /**
   * Submits form data to Firebase, then navigates to the BDR URL
   * in a new tab by appending the form fields as query parameters.
   */
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      await addActivityData(data);
      // Open the repository URL in a new tab with form data as query params,
      // mirroring the original native form GET submission behavior
      const params = new URLSearchParams(data).toString();
      window.open(`${dataPath}?${params}`, "_blank");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Form.Root
      className="outline outline-neutral-100 outline-1 p-6 space-y-4 rounded shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <FormInput
            label="Name"
            placeholder=""
            errorMessage={errors.name?.message}
            {...field}
            required
          />
        )}
      />
      <Controller
        name="institution"
        control={control}
        rules={{ required: "Institution is required" }}
        render={({ field }) => (
          <FormInput
            label="Institution"
            placeholder=""
            errorMessage={errors.institution?.message}
            {...field}
            required
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            // Matches standard email format: local@domain.tld
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please provide a valid email",
          },
        }}
        render={({ field }) => (
          <FormInput
            label="Email"
            placeholder=""
            match="typeMismatch"
            errorMessage={errors.email?.message}
            {...field}
            required
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <Textarea
            label="Description"
            placeholder=""
            sublabel="How will the data be used?"
            errorMessage={errors.description?.message}
            {...field}
            required
          />
        )}
      />

      <Form.Submit asChild>
        <Button disabled={isSubmitting}>
          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default DataForm;
