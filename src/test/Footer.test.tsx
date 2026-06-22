import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('OFFICE-X')).toBeInTheDocument();
  });

  it('renders privacy and terms links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('PRIVACIDADE')).toBeInTheDocument();
    expect(screen.getByText('TERMOS')).toBeInTheDocument();
  });
});
