import { useState, useRef, useCallback } from "react";
import { Form, TextInput, TextInputRef } from "../ui";
import makeRandomNumber from "../utils/makeRandomNumber";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [randomNumber, setRandomNumber] = useState("");

  const nameRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);
  const confirmPasswordRef = useRef<TextInputRef>(null);
  const emailRef = useRef<TextInputRef>(null);
  const verificationCodeRef = useRef<TextInputRef>(null);

  const [isVerifying, setIsVerifying] = useState(false);

  const generateVerificationCode = () => {
    const number = makeRandomNumber(6).toString();
    setRandomNumber(number);
  };

  const onSubmit = useCallback(() => {
    if (!isVerifying) {
      if (nameRef.current?.message === "code 0") {
        alert("이름을 확인해주세요.");
        return nameRef.current?.focus();
      }

      if (emailRef.current?.message === "code 0") {
        alert("이메일을 확인해주세요.");
        return emailRef.current?.focus();
      }
      if (passwordRef.current?.message === "code 0") {
        alert("비밀번호를 확인해주세요.");
        return passwordRef.current?.focus();
      }

      if (confirmPasswordRef.current?.message === "code 0") {
        alert("비밀번호를 한 번 더 확인해주세요.");
        return confirmPasswordRef.current?.focus();
      }
      if (password !== confirmPassword) {
        return alert("비밀번호가 일치하지 않습니다.");
      }

      generateVerificationCode();
      setIsVerifying(true);
      return verificationCodeRef.current?.focus();
    }
  }, [
    isVerifying,
    email,
    name,
    password,
    confirmPassword,
    generateVerificationCode,
  ]);

  return (
    <div className="max-w-100 p-5 mt-5 mx-auto border dark:border-darkBorder border-border rounded">
      <Form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">
          {!isVerifying ? "회원가입" : "인증하기"}
        </h1>
        {!isVerifying ? (
          <>
            <TextInput
              id="name"
              label="이름"
              onChangeText={setName}
              ref={nameRef}
              value={name}
              placeholder="박보검"
            />
            <TextInput
              id="email"
              label="이메일"
              onChangeText={setEmail}
              ref={emailRef}
              value={email}
              placeholder="email@dazone.com"
            />
            <TextInput
              id="password"
              label="비밀번호"
              onChangeText={setPassword}
              ref={passwordRef}
              value={password}
              placeholder="* * * * * * * *"
              type="password"
            />
            <TextInput
              id="confirmPassword"
              label="비밀번호 확인"
              onChangeText={setConfirmPassword}
              ref={confirmPasswordRef}
              value={confirmPassword}
              placeholder="* * * * * * * *"
              type="password"
            />
          </>
        ) : (
          <>
            <TextInput
              id="verificationCode"
              label="인증번호"
              onChangeText={setVerificationCode}
              ref={verificationCodeRef}
              value={verificationCode}
              placeholder="인증번호를 입력하세요."
            />
          </>
        )}
        <button className="btn">{isVerifying ? "회원가입" : "인증하기"}</button>

        {isVerifying && (
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn border"
              onClick={generateVerificationCode}
            >
              RE-SEND
            </button>
            <p className="opacity-10">
              {randomNumber.length > 0 && randomNumber}
            </p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default Signup;
