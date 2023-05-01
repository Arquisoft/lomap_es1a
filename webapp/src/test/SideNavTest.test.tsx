import { render, fireEvent } from '@testing-library/react';
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

  /*t('should toggle the open state when the menu button is clicked', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    );
    const menuButton = getByRole('button');
    fireEvent.click(menuButton);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
  });
  */
});
