import React, { type ReactNode } from "react";

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: ReactNode;
}

interface BaseInputComponentProps {
  label: ReactNode;
  icon?: ReactNode;
  inputElement: ReactNode;
  errorMessages?: ReactNode;
  containerClassName?: string;
}

/**
 * BaseInput provides shared styling and structure for input components.
 * This is a presentational component that doesn't handle form logic.
 */
export const BaseInput: React.FC<BaseInputComponentProps> = ({
  label,
  icon,
  inputElement,
  errorMessages,
  containerClassName = "flex flex-col gap-2",
}) => {
  return (
    <div className={containerClassName}>
      {label}
      <div className="min-w-60 w-max focus-within:shadow-inner-focus flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-inner">
        {icon && <span className="text-neutral-300 w-5 h-5">{icon}</span>}
        {inputElement}
      </div>
      {errorMessages}
    </div>
  );
};
