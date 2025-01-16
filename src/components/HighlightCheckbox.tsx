import React from "react";

type HighlightCheckboxProps = {
  onChange: (checked: boolean) => void; // Callback avec un booléen
};

const HighlightCheckbox: React.FC<HighlightCheckboxProps> = ({ onChange }) => (
  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
    <input
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
      aria-label="Highlight oldest clients per city"
      style={{ marginRight: "8px" }}
    />
    <span
      style={{
        transition: "color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#646cff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
    >
      Highlight oldest per city
    </span>
  </label>
);

export default HighlightCheckbox;
