import React from "react";
import { twMerge } from "tailwind-merge";

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
const Form = (props: FormProps) => {
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        if (props.onSubmit) {
          props.onSubmit(e);
        }
      }}
      className={twMerge("flex flex-col gap-2.5", props?.className)}
    />
  );
};

export default Form;
