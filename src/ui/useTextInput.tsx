import React, { ReactNode, useCallback, useRef } from "react";
import { Input, Props as InputProps } from "./TextInput";
import { InputWrapper, InputWrapperProps } from "./Container";

export interface UseTextInputProps extends InputWrapperProps {
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  inputProps?: InputProps;
}

const useTextInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const focus = useCallback(
    () => setTimeout(() => ref.current?.focus(), 100),
    [ref]
  );

  const Component = useCallback(
    ({
      id,
      title,
      message,
      onChange,
      value,
      className,
      inputProps,
    }: UseTextInputProps) => {
      const wrapperProps = { id, title, message };
      return (
        <InputWrapper {...wrapperProps}>
          <Input
            {...inputProps}
            ref={ref}
            {...wrapperProps}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={className}
          />
        </InputWrapper>
      );
    },
    [ref]
  );

  return {
    ref,
    Component,
    focus,
  };
};

export default useTextInput;

export type UseTextInputType = {
  ref: React.RefObject<HTMLInputElement | null>;
  Component: ({
    id,
    title,
    message,
    onChange,
    value,
    className,
    inputProps,
  }: UseTextInputProps) => ReactNode;
  focus: () => number;
};
