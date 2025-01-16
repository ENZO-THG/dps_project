import React, { useState, useEffect } from "react";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(inputValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search by name"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
      }}
    />
  );
};

export default SearchBar;
