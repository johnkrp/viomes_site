import { Input } from "@/components/ui/input";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text..." />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId("test-input") as HTMLInputElement;

    await user.type(input, "Hello World");
    expect(input.value).toBe("Hello World");
  });

  it("handles change events", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} data-testid="test-input" />);
    const input = screen.getByTestId("test-input");

    await user.type(input, "test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    render(<Input disabled data-testid="test-input" />);
    const input = screen.getByTestId("test-input");
    expect(input).toBeDisabled();
  });

  it("supports different input types", () => {
    render(<Input type="email" placeholder="email@example.com" data-testid="email-input" />);
    const input = screen.getByTestId("email-input") as HTMLInputElement;
    expect(input.type).toBe("email");
  });
});
