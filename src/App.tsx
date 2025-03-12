import { useState } from "react";
import useTextInput from "./ui/useTextInput";
import useSelect from "./ui/useSelect";

const App = () => {
  const [props, setProps] = useState({
    email: "asdfasdf@asdfas.com",
    password: "123123",
    purpose: "",
  });

  const Email = useTextInput();
  const Password = useTextInput();
  const Purpose = useSelect();

  return (
    <div>
      <Email.Component
        id="email"
        onChange={(email) => setProps((prev) => ({ ...prev, email }))}
        title="이메일"
        value={props.email}
        inputProps={{ type: "email" }}
      />
      <Password.Component
        id="password"
        onChange={(password) => setProps((prev) => ({ ...prev, password }))}
        title="비밀번호"
        value={props.password}
        inputProps={{ type: "password" }}
      />
      <Purpose.Component
        id="p"
        onSelect={(p) => setProps((prev) => ({ ...prev, purpose: p }))}
        options={["그냥", "재미", "공부", "직업"]}
        placeholder="목적을 선택하세요."
        title="가입목적"
        value={props.purpose}
      />

      <button onClick={() => Email.focus()}>focus email</button>
      <button onClick={() => Password.focus()}>focus password</button>
      <button onClick={() => Purpose.show()}>focus purpose</button>
    </div>
  );
};

export default App;
