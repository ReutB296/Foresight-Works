import { FC, useState } from "react";

import { Select } from "../Select/Select";

import "./Form.scss";

const options = [
  { label: "Image", value: 1 },
  { label: "Live", value: 2 },
  { label: "Notes", value: 3 },
  { label: "Presentation", value: 4 },
  { label: "Report", value: 5 },
  { label: "Video", value: 6 },
];

const singlePlaceholder = "Choose option";
const multiPlaceholder = "Choose options";

export const Form: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, selectedOptions });
    selectedOptions.map((option: number) => console.log(option));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4>Registration Form</h4>
        <div className="name-container">
          <div className="first-name-container">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="last-name-container">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="email-container">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="select-category-container">
          <label>Select Category</label>
          <Select
            options={options}
            isMultiple={true}
            placeholder={multiPlaceholder}
            onChange={(selected) => setSelectedOptions(selected)}
          />
          {/* <Select
            options={options}
            isMultiple={false}
            placeholder={singlePlaceholder}
            onChange={(selected) => setSelectedOptions(selected)}
          /> */}
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
