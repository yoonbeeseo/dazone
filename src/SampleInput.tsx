import { useRef, useImperativeHandle, Ref } from "react";
import { Container, TextInput } from "./ui";

interface SampleProps {
  ref: Ref<SampleInputRef>;
}

export interface SampleInputRef {
  focusInput1: () => void;
  focusInput2: () => void;
  focusInput3: () => void;
  value1: string;
  value2: string;
  value3: string;
}

const SampleInput = ({ ref }: SampleProps) => {
  const values = {
    value1: "a",
    value2: "b",
    value3: "c",
  };

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput1: () => ref1.current?.focus(),
    focusInput2: () => ref2.current?.focus(),
    focusInput3: () => ref3.current?.focus(),
    ...values,
  }));

  return (
    <>
      <Container.InputWrapper id="text" title="text">
        <TextInput.Input ref={ref1} />
      </Container.InputWrapper>
      <Container.InputWrapper id="text1" title="text1">
        <TextInput.Input ref={ref2} />
      </Container.InputWrapper>
      <Container.InputWrapper id="text2" title="text2">
        <TextInput.Input ref={ref3} />
      </Container.InputWrapper>
    </>
  );
};

export default SampleInput;
