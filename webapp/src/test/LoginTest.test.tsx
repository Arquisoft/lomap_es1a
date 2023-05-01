import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import { act } from 'react-dom/test-utils';


describe("Login component", () => {
  afterEach(cleanup);

  it('renders login component', () => {
    render(<Login />);
    const loginElement = screen.getByText(/Log In/i);
    expect(loginElement).toBeInTheDocument();
  });

  it("should update redirect URL to current page URL when component is rendered", () => {
    render(<Login />);
    const expectedUrl = window.location.href;
    setTimeout(() => {
      const actualUrl = localStorage.getItem("redirectUrl");
      expect(actualUrl).toEqual(expectedUrl);
    }, 500);
  });
  
});
