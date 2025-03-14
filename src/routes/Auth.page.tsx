import { useState, useRef, useCallback } from "react";
import { AUTH } from "../contextApi/context";
import { TextInput, TextInputRef, Form } from "../ui";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navi = useNavigate();
  const { signin, signup } = AUTH.use();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<TextInputRef>(null);
  const passwordRef = useRef<TextInputRef>(null);

  const onSubmit = useCallback(async () => {
    if (emailRef.current?.message === "code 0") {
      alert("이메일을 입력해주세요.");
      return emailRef.current?.focus();
    }
    if (passwordRef.current?.message === "code 0") {
      alert("비밀번호를 입력해주세요.");
      return passwordRef.current?.focus();
    }
    const { message, success } = await signin(email, password);
    if (!success && message) {
      return alert(message);
    }
    console.log("user login succeeded");

    alert("환영합니다!");
    navi("/myAccount");
  }, [email, password, signin, navi]);

  return (
    <div className="max-w-100 mx-auto mt-5">
      <Form
        onSubmit={onSubmit}
        className="border rounded dark:border-darkBorder border-border p-5"
      >
        <TextInput
          id="email"
          label="이메일"
          onChangeText={setEmail}
          ref={emailRef}
          value={email}
          placeholder="email@email.com"
          type="email"
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
        <button className="btn">Submit</button>
      </Form>

      <div>
        <p>또는 회원가입</p>
        <span></span>
      </div>
      <button className="btn border">회원가입</button>
    </div>
  );
};

export default AuthPage;
