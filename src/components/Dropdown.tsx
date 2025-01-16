import React from "react";
import Select from "react-select";

type DropdownProps = {
  options: { value: string; label: string }[]; // Typage des options pour React-Select
  onChange: (value: string | null) => void; // Fonction de callback pour le changement
};

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  if (!options || options.length === 0) {
    console.warn("Dropdown component received empty options array.");
    return <p style={{ color: "red" }}>No options available</p>;
  }

  return (
    <Select
      options={options}
      placeholder="Select city"
      onChange={(selectedOption) =>
        onChange(selectedOption ? selectedOption.value : null)
      }
      isClearable
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "5px",
          border: "1px solid #ccc",
          padding: "2px",
          boxShadow: "none",
          '&:hover': { borderColor: "#646cff" },
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#888",
        }),
      }}
    />
  );
};

export default Dropdown;
