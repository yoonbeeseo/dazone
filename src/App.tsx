import React from "react";
import Item from "./Item";

const App = () => {
  const data = "Hello World";
  return (
    <div>
      <h1>App</h1>
      <Item data={data} />
      <Item data={"1234123"} />
      <Item data="함수 확인" fn={() => console.log(data)} />
    </div>
  );
};

export default App;
