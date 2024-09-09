import { FC, useState } from "react";

import "./Select.scss";

interface SelectOption {
  label: string;
  value: any;
}

interface SelectProps {
  options: SelectOption[];
  isMultiple: boolean;
  placeholder: string;
  onChange: (value: any) => void;
}

export const Select: FC<SelectProps> = ({
  options,
  isMultiple,
  placeholder,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");

  const handleSelect = (value: any) => {
    if (isMultiple) {
      if (selectedValues.includes(value)) {
        setSelectedValues((prev) => prev.filter((val) => val !== value));
      } else {
        setSelectedValues((prev) => [...prev, value]);
      }
    } else {
      setSelectedValues([value]);
      setIsDropdownOpen(false);
    }
    onChange(isMultiple ? selectedValues : value);
  };

  const handleSelectAll = () => {
    setSelectedValues(options.map((option) => option.value));
    onChange(options.map((option) => option.value));
  };

  const handleDeselectAll = () => {
    setSelectedValues([]);
    onChange([]);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="select-container">
      <div
        className="select-box"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedValues.length === 0
          ? placeholder
          : selectedValues
              .map(
                (value: number) =>
                  options.find((option: SelectOption) => option.value === value)
                    ?.label
              )
              .join(", ")}
        <span className="dropdown-icon">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {isDropdownOpen && (
        <div className="select-dropdown">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="select-filter"
          />
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleSelect(option.value)}>
                {isMultiple ? (
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    readOnly
                  />
                ) : null}
                {option.label}
              </li>
            ))}
          </ul>
          {isMultiple && (
            <div className="select-all-options">
              {selectedValues.length === options.length ? (
                <button onClick={handleDeselectAll}>Deselect All</button>
              ) : (
                <button onClick={handleSelectAll}>Select All</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
