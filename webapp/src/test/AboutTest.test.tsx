import React from "react";
import { render } from "@testing-library/react";
import About from "../pages/About";

describe("About component", () => {
  test("renders title", () => {
    const { getByText } = render(<About />);
    const titleElement = getByText(/Welcome to LoMap/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders welcome message", () => {
    const { getByText } = render(<About />);
    const messageElement = getByText(/Save your favourite locations and share them with your friends!/i);
    expect(messageElement).toBeInTheDocument();
  });

  test("renders developer names", () => {
    const { getByText } = render(<About />);
    const developer1Element = getByText(/Adrián Alves Morales/i);
    const developer2Element = getByText(/Andrés Ángel González Granda/i);
    const developer3Element = getByText(/Pedro Garcia-Cañal Sánchez/i);
    const developer4Element = getByText(/Marcos Caraduje Martínez/i);
    expect(developer1Element).toBeInTheDocument();
    expect(developer2Element).toBeInTheDocument();
    expect(developer3Element).toBeInTheDocument();
    expect(developer4Element).toBeInTheDocument();
  });

});
