import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { TextInput } from ".";

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Col = (props: DivProps) => {
  return <div {...props} className={twMerge("div col", props?.className)} />;
};

export const Row = (props: DivProps) => {
  return <div {...props} className={twMerge("div", props?.className)} />;
};

export interface InputWrapperProps extends PropsWithChildren {
  id: string;
  title: string;
  message?: string | null;
}
export const InputWrapper = ({
  children,
  id,
  title,
  message,
}: InputWrapperProps) => {
  return (
    <Col className="i-wrap">
      <TextInput.Label htmlFor={id}>{title}</TextInput.Label>
      {children}
      {message && (
        <TextInput.Label className="l-msg" htmlFor={id}>
          {message}
        </TextInput.Label>
      )}
    </Col>
  );
};
