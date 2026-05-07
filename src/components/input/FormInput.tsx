import React from "react";
import * as Form from "@radix-ui/react-form";
import { BaseInput, type BaseInputProps } from "./BaseInput";

interface FormInputProps extends BaseInputProps {
  match?:
    | "valueMissing"
    | "typeMismatch"
    | "patternMismatch"
    | "tooLong"
    | "tooShort"
    | "rangeUnderflow"
    | "rangeOverflow"
    | "stepMismatch"
    | "badInput"
    | ((value: string, formData: FormData) => boolean);
  errorMessage?: string;
}

// eslint-disable-next-line react/display-name
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, name, icon, match, errorMessage, ...delegated }: FormInputProps,
    ref,
  ) => {
    return (
      <Form.Field name={name}>
        <BaseInput
          label={<Form.Label>{label}</Form.Label>}
          icon={icon}
          inputElement={
            <Form.Control asChild>
              <input {...delegated} ref={ref} />
            </Form.Control>
          }
          errorMessages={
            <>
              <Form.Message
                className="text-primary-300 px-2"
                match="valueMissing"
              >
                Please enter your {label}
              </Form.Message>
              {match !== undefined && errorMessage && (
                <Form.Message className="text-primary-300 px-2" match={match}>
                  {errorMessage}
                </Form.Message>
              )}
            </>
          }
        />
      </Form.Field>
    );
  },
);
