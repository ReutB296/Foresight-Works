import { render, screen, fireEvent, within } from "@testing-library/react";

import { Select, SelectOption } from "../components/Select/Select";

const mockOptions: SelectOption[] = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

describe("Select Component", () => {
  test("renders with correct placeholder", () => {
    render(
      <Select
        options={mockOptions}
        selectedOptions={null}
        isMultiple={false}
        placeholder="Choose option"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("Choose option")).toBeInTheDocument();
  });

  test("opens and closes the dropdown on click", () => {
    render(
      <Select
        options={mockOptions}
        selectedOptions={null}
        isMultiple={false}
        placeholder="Choose option"
        onChange={jest.fn()}
      />
    );

    const selectBox = screen.getByText("Choose option");
    fireEvent.click(selectBox);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  test("allows selecting a single option", () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={mockOptions}
        selectedOptions={null}
        isMultiple={false}
        placeholder="Choose option"
        onChange={handleChange}
      />
    );

    const selectBox = screen.getByText("Choose option");
    fireEvent.click(selectBox);

    const dropdown = screen.getByRole("listbox");
    const option = within(dropdown).getByText(mockOptions[0].label);

    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(mockOptions[0]);
  });

  test("allows selecting multiple options", () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={mockOptions}
        selectedOptions={[]}
        isMultiple={true}
        placeholder="Choose options"
        onChange={handleChange}
      />
    );

    const selectBox = screen.getByText("Choose options");
    fireEvent.click(selectBox);

    const dropdown = screen.getByRole("listbox");
    const option1 = within(dropdown).getByText(mockOptions[0].label);

    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith([mockOptions[0]]);

    const option2 = within(dropdown).getByText(mockOptions[1].label);
    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledWith([mockOptions[1]]);
  });

  test("allows deselecting multiple options", () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={mockOptions}
        selectedOptions={[mockOptions[0], mockOptions[1]]}
        isMultiple={true}
        placeholder="Choose options"
        onChange={handleChange}
      />
    );

    const selectBox = screen.getByText("Option 1, Option 2");
    fireEvent.click(selectBox);

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    expect(handleChange).toHaveBeenCalledWith([mockOptions[1]]);
  });

  test("deselect all works", () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={mockOptions}
        selectedOptions={[mockOptions[0], mockOptions[1], mockOptions[2]]}
        isMultiple={true}
        placeholder="Choose options"
        onChange={handleChange}
      />
    );

    const selectBox = screen.getByText("Option 1, Option 2, Option 3");
    fireEvent.click(selectBox);

    const dropdown = screen.getByRole("listbox");
    const deselectAllButton = within(dropdown).getByText("Deselect All");
    fireEvent.click(deselectAllButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  test("select all works", () => {
    const handleChange = jest.fn();

    render(
      <Select
        options={mockOptions}
        selectedOptions={[]}
        isMultiple={true}
        placeholder="Choose options"
        onChange={handleChange}
      />
    );

    const selectBox = screen.getByText("Choose options");
    fireEvent.click(selectBox);

    const dropdown = screen.getByRole("listbox");
    const selectAllButton = within(dropdown).getByText("Select All");
    fireEvent.click(selectAllButton);

    expect(handleChange).toHaveBeenCalledWith(mockOptions);
  });
});
