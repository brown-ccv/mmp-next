import * as Form from "@radix-ui/react-form";
import React, { type ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: ReactNode;
  match?: Form.FormMessageProps["match"];
  errorMessage?: string;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, icon, match, errorMessage, ...delegated }: InputProps,
    ref,
  ) => {
    return (
      <Form.Field name={name} className="flex flex-col gap-2">
        <Form.Label>{label}</Form.Label>
        <div className="min-w-60 w-max focus-within:shadow-inner-focus flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-inner">
          {icon && <span className="text-neutral-300 w-5 h-5">{icon}</span>}

          <Form.Control asChild>
            <input {...delegated} ref={ref} />
          </Form.Control>
        </div>
        <Form.Message className="text-primary-300 px-2" match="valueMissing">
          Please enter your {label}
        </Form.Message>
        {match !== undefined && (
          <>
            <Form.Message match={match}>{errorMessage}</Form.Message>
          </>
        )}
      </Form.Field>
    );
  },
);
