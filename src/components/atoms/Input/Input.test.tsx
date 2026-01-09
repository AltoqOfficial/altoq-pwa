import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Input } from "./Input";

describe("Input", () => {
  it("renders input with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Input placeholder="test" variant="default" />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("bg-white");
  });

  it("applies outline variant styles", () => {
    render(<Input placeholder="test" variant="outline" />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("bg-transparent");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Input placeholder="test" size="sm" />);
    let input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("h-9");

    rerender(<Input placeholder="test" size="md" />);
    input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("h-11");

    rerender(<Input placeholder="test" size="lg" />);
    input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("h-14");
  });

  it("displays error message when error is true", () => {
    render(
      <Input
        placeholder="test"
        error={true}
        errorMessage="This field is required"
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("does not display error message when error is false", () => {
    render(
      <Input
        placeholder="test"
        error={false}
        errorMessage="This field is required"
      />
    );
    expect(
      screen.queryByText("This field is required")
    ).not.toBeInTheDocument();
  });

  it("applies error styles when error is true", () => {
    render(<Input placeholder="test" error={true} />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("border-primary-600");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies custom className", () => {
    render(<Input placeholder="test" className="custom-class" />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("custom-class");
  });

  it("passes through native input props", () => {
    render(
      <Input
        placeholder="test"
        type="email"
        required
        disabled
        data-testid="email-input"
      />
    );
    const input = screen.getByTestId("email-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });
});
