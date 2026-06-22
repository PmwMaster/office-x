import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

describe('Navbar', () => {
  it('renders the brand name OFFICE-X', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('OFFICE-X')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('LOJA')).toBeInTheDocument();
    expect(screen.getByText('SERVIÇOS')).toBeInTheDocument();
  });
});
