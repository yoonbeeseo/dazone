import { useState } from "react";
import { TextInput } from "./ui";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div>
      <h1>App</h1>
      <TextInput.Input className="px-5" />
      <select name="" id="">
        <option value="">hello</option>
      </select>
      <button
        onClick={() => {
          document.body.classList.toggle("dark");
        }}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default App;
