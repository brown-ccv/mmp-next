import React from "react";
import { BaseInput, type BaseInputProps } from "./BaseInput";

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, name, icon, className = "", ...delegated }: BaseInputProps,
    ref,
  ) => {
    return (
      <BaseInput
        label={<label htmlFor={name}>{label}</label>}
        icon={icon}
        inputElement={
          <input
            id={name}
            name={name}
            className={className}
            {...delegated}
            ref={ref}
          />
        }
        containerClassName={className}
      />
    );
  },
);
