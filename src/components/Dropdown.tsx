import React from "react";
import Select from "react-select";

type DropdownProps = {
  options: { value: string; label: string }[]; // Typage des options pour React-Select
  onChange: (value: string | null) => void; // Fonction de callback pour le changement
};

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => (
  <Select
    options={options}
    placeholder="Select city"
    onChange={(selectedOption) =>
      onChange(selectedOption ? selectedOption.value : null)
    }
    isClearable
  />
);

export default Dropdown;
