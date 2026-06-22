import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  sublabel?: string;
  name: string;
  /** Error message surfaced from React Hook Form validation */
  errorMessage?: string;
}

// eslint-disable-next-line react/display-name
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, sublabel, errorMessage, onChange, ...delegated }, ref) => {
    const [characterCount, setCharacterCount] = useState(0);
    const maxLength = 300;

    /**
     * Tracks the character count for the counter display while
     * preserving the onChange handler passed in via props (e.g. from RHF).
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <Form.Field name={name} className="relative flex flex-col gap-2">
        <Form.Label>
          <p>{label}</p>
          {sublabel && (
            <p className="text-sm text-neutral-800 ml-1">{sublabel}</p>
          )}
        </Form.Label>
        <span className="text-neutral-800 top-9 right-1 absolute px-2 py-1 text-xs rounded">
          {characterCount}/{maxLength}
        </span>
        <Form.Control asChild>
          <textarea
            rows={4}
            maxLength={maxLength}
            className="w-full py-6 text-sm font-medium text-gray-400 border-b-2 outline-none"
            {...delegated}
            ref={ref}
            onChange={handleChange}
          />
        </Form.Control>
        <Form.Message className="text-primary-300 px-2" match="valueMissing">
          Please enter your {label}
        </Form.Message>
        {/* Render RHF validation error if present, separate from Radix UI's
            built-in valueMissing message */}
        {errorMessage && (
          <p className="text-primary-300 px-2">{errorMessage}</p>
        )}
      </Form.Field>
    );
  },
);
