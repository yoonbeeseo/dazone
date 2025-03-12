import { useRef, useCallback } from "react";
import { InputWrapper, InputWrapperProps } from "./Container";

export interface UseSelectProps extends InputWrapperProps {
  selectProps?: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  value: string | number;
  onSelect: (value: string) => void;
  placeholder: string;
  options: string[];
  className?: string;
}

const useSelect = () => {
  const ref = useRef<HTMLSelectElement>(null);
  const focus = useCallback(
    () => setTimeout(() => ref.current?.focus(), 100),
    [ref]
  );
  const show = useCallback(
    () => setTimeout(() => ref.current?.showPicker(), 100),
    [ref]
  );
  const hide = useCallback(
    () => setTimeout(() => ref.current?.blur(), 100),
    [ref]
  );

  const Component = useCallback(
    ({
      id,
      onSelect,
      options,
      placeholder,
      title,
      value,
      className,
      selectProps,
      message,
    }: UseSelectProps) => {
      const wrapperProps = { id, title, message };
      return (
        <InputWrapper {...wrapperProps}>
          <select
            {...selectProps}
            {...wrapperProps}
            ref={ref}
            value={value}
            onChange={(e) => onSelect(e.target.value)}
            className={className}
          >
            <option>{placeholder}</option>

            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </InputWrapper>
      );
    },
    [ref]
  );

  return {
    Component,
    ref,
    focus,
    show,
    hide,
  };
};

export default useSelect;
