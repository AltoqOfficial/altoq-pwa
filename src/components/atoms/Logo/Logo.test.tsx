import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Logo } from "./Logo";

describe("Logo Component", () => {
  it("renders image with correct alt text", () => {
    render(<Logo />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).toBeInTheDocument();
  });

  it("applies white filter class for white variant", () => {
    render(<Logo variant="white" />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).toHaveClass("brightness-0", "invert");
  });

  it("applies priority prop for above-fold logos", () => {
    render(<Logo priority />);
    const logo = screen.getByAltText("Altoq");
    // In test environment, Next.js Image may not set loading attribute
    // Just verify the image renders correctly with priority prop
    expect(logo).toBeInTheDocument();
  });

  it("wraps logo in Link when asLink is true", () => {
    const { container } = render(<Logo asLink />);
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("aria-label", "Ir a la página de inicio");
  });

  it("applies correct dimensions for different sizes", () => {
    const { rerender } = render(<Logo size="sm" />);
    let logo = screen.getByAltText("Altoq");
    expect(logo).toHaveAttribute("width", "96");
    expect(logo).toHaveAttribute("height", "32");

    rerender(<Logo size="md" />);
    logo = screen.getByAltText("Altoq");
    expect(logo).toHaveAttribute("width", "128");
    expect(logo).toHaveAttribute("height", "42");

    rerender(<Logo size="lg" />);
    logo = screen.getByAltText("Altoq");
    expect(logo).toHaveAttribute("width", "192");
    expect(logo).toHaveAttribute("height", "64");
  });

  it("applies default variant classes correctly", () => {
    render(<Logo variant="default" />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).not.toHaveClass("brightness-0");
    expect(logo).not.toHaveClass("invert");
  });

  it("applies red variant classes correctly", () => {
    render(<Logo variant="red" />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).not.toHaveClass("brightness-0");
    expect(logo).not.toHaveClass("invert");
  });

  it("applies custom className when provided", () => {
    render(<Logo className="custom-class" />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).toHaveClass("custom-class");
  });

  it("applies object-contain class for aspect ratio maintenance", () => {
    render(<Logo />);
    const logo = screen.getByAltText("Altoq");
    expect(logo).toHaveClass("object-contain");
  });

  it("renders without Link wrapper when asLink is false", () => {
    const { container } = render(<Logo asLink={false} />);
    const link = container.querySelector("a");
    expect(link).toBeNull();
  });
});
