import '@testing-library/jest-dom';
import About from '../components/about';
import { render, screen } from '@testing-library/react';

describe('About Component', () => {
  test('renders the About page with title and description', () => {
    render(<About />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders a clickable link to RS School React course', () => {
    render(<About />);
    const rsSchoolLink = screen.getByText('RS School React course');
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rsSchoolLink).toHaveAttribute('target', '_blank');
  });

  test('renders a clickable link to GitHub profile', () => {
    render(<About />);
    const profileLink = screen.getByText('Natallia Katsuba');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute(
      'href',
      'https://github.com/nata1ka89/React2025Q3/pulls'
    );
    expect(profileLink).toHaveAttribute('target', '_blank');
  });
});
