import React from "react";

interface Props {
  date: Date
}

export const FormattedDate: React.FC<Props> = ({ date }) => {
    return (
        <time dateTime={date.toISOString()}>
            {
                date.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
            }
        </time>
    )
}
