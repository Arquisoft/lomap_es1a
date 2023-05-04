import { render, fireEvent, screen, RenderResult} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';

describe('NavBar', () => {
    it('should go to the login page when clicked', () => {
        const { getByRole } = render(
          <BrowserRouter>
            <NavBar />
          </BrowserRouter>
        );
        const login = screen.getByRole('button', {name: 'Log in'});
        expect(login).toBeInTheDocument();
      });
})