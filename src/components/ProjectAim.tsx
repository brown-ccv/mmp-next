import React from "react";

interface ProjProps {
  color: "blue" | "primary" | "brown"
    children?: React.ReactNode
    icon?: React.ReactNode
}

export const ProjectAim: React.FC<ProjProps> = ({color, children, icon}) => {
  return (
      <div className="flex-1 flex flex-col gap-4">
  <span
      className={color === "blue"
          ? "text-secondary-blue-500"
          : color === "primary"
              ? "text-primary-500"
              : "text-secondary-brown-500"}
  >
    {icon}
  </span>
        <hr
            className={`h-1 w-36 border-none ${
                color === "blue"
                    ? "bg-secondary-blue-500"
                    : color === "primary"
                        ? "bg-primary-500"
                        : "bg-secondary-brown-500"
            } `}
        />
        <p>
            {children}
        </p>
      </div>

  )
}