import { Container, TextInput } from "./ui";

const App = () => {
  return (
    <div>
      <Container.InputWrapper
        id="text"
        title="text"
        message={"asdfasdfasdfsdafa"}
      >
        <TextInput.Input />
      </Container.InputWrapper>
      <Container.Row>
        <p>123123</p>
        <p>123123</p>
      </Container.Row>
    </div>
  );
};

export default App;
