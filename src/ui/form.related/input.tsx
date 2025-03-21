import { useRef, Ref, useImperativeHandle, useMemo, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface TextInputProps {
  value: string | number;
  onChangeText: PropsFunc<string>;
  id: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;

  ref: Ref<TextInputRef>;

  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

export interface TextInputRef {
  focus: Func;
  message: "code 0" | null;
}

const TextInput = ({
  id,
  label,
  onChangeText,
  ref,
  value,
  placeholder,
  type,
  props,
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const message = useMemo<"code 0" | null>(() => {
    const copy = value.toString();
    if (copy.length === 0) {
      return "code 0";
    }
    return null;
  }, [value]);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => setTimeout(() => inputRef.current?.focus(), 100),
      message,
      ref: inputRef,
    }),
    [inputRef, message]
  );

  return (
    <div className="ti-con">
      {label && (
        <label htmlFor={id} className="ti-l">
          {label}
        </label>
      )}
      <input
        {...props}
        className={twMerge("ti-i", props?.className)}
        type={type ?? "text"}
        id={id}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );
};

export default TextInput;
