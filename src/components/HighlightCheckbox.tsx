import React from "react";

type HighlightCheckboxProps = {
  onChange: (checked: boolean) => void; // Callback avec un booléen
};

const HighlightCheckbox: React.FC<HighlightCheckboxProps> = ({ onChange }) => (
  <label>
    <input
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
    />
    Highlight oldest per city
  </label>
);

export default HighlightCheckbox;
