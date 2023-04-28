import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../pages/Login";
declare const Solid: any;


describe("Login component", () => {
  test("changes idp state when selecting a provider", () => {
    render(<Login />);
    const select = screen.getByLabelText("Select your Identity Provider:");
    fireEvent.change(select, { target: { value: "https://inrupt.net" } });
    expect(select).toBe("https://inrupt.net");
  });

  test("sets redirect URL to current URL when component is mounted", () => {
    window.history.pushState({}, "Test page", "/test");
    render(<Login />);
    expect(screen.getByLabelText("Redirect URL")).toHaveValue("http://localhost/test");
  });
});
