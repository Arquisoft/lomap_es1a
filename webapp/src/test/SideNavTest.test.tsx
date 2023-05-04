import { render, fireEvent, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideNav from '../components/Sidenav';

describe('SideNav', () => {

  it('should render the component', () => {
    const { container } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should go to the account page when clicked', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    const account = screen.getByRole('link', {name: 'Account'});
    expect(account).toBeInTheDocument();

    act(() => {
      fireEvent.click(account);
    })
  });

  it('should go to the friends page when clicked', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    const friends = screen.getByRole('link', {name: 'Friends'});
    expect(friends).toBeInTheDocument();

    act(() => {
      fireEvent.click(friends);
    })
  });

  it('should go to the about page when clicked', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    const about = screen.getByRole('link', {name: 'About'});
    expect(about).toBeInTheDocument();

    act(() => {
      fireEvent.click(about);
    })
  });

});
