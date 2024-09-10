import { FC, useEffect, useRef, useState } from "react";

import "./Select.scss";

export type SelectOption = {
  label: string;
  value: number;
};

type MultipleSelectProps = {
  isMultiple: true;
  placeholder: string;
  selectedOptions: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  isMultiple: false;
  placeholder: string;
  selectedOptions: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select: FC<SelectProps> = ({
  options,
  selectedOptions,
  isMultiple,
  placeholder,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: SelectOption) => {
    if (isMultiple) {
      if (selectedOptions.includes(value)) {
        onChange(
          selectedOptions.filter((option: SelectOption) => option !== value)
        );
      } else {
        onChange([...selectedOptions, value]);
      }
    } else {
      if (selectedOptions !== value) onChange(value);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (isMultiple) {
      onChange(options);
    }
  };

  const handleDeselectAll = () => {
    if (isMultiple) {
      onChange([]);
    }
  };

  const filteredOptions = options.filter((option: SelectOption) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setFilterText("")
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="select-container" ref={selectContainerRef}>
      <div
        className="select-box"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {isMultiple
          ? (selectedOptions as SelectOption[]).length === 0
            ? placeholder
            : (selectedOptions as SelectOption[])
                .map((option: SelectOption) => option.label)
                .join(", ")
          : selectedOptions === null
          ? placeholder
          : (selectedOptions as SelectOption).label}
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
            {filteredOptions.map((option: SelectOption) => (
              <li key={option.value} onClick={() => handleSelect(option)}>
                {isMultiple ? (
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    readOnly
                  />
                ) : null}
                {option.label}
              </li>
            ))}
          </ul>
          {isMultiple && (
            <div className="select-all-options">
              {selectedOptions.length === options.length ? (
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
