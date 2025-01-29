import { useState } from "react";

const Searchbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [userInput, setUserInput] = useState("");

  const handleSearch = () => {
    if (userInput.trim()) {
      onSearch(userInput); // Pass the user input back to the parent
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Find a pokemon"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <button onClick={handleSearch}> Search </button>
    </div>
  );
};

export default Searchbar;
