import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
  const title = 'Buscador de gifs';

  test('should render the title corectly', () => {

    const { container } = render(<CustomHeader title = {title} />);

    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toContain(title);

  });

  test('should render the description when provided', () => {

    const desc = 'Descubre y comparte el Gif perfecto';

    const { container } = render(<CustomHeader title = {title} description={desc} />);

    const p = container.querySelector('p');

    expect(p?.innerHTML).toContain(desc);
    expect(screen.getByRole('paragraph')).toBeDefined();

  });

  test('should not render description when not provided', () => {

    const { container } = render(<CustomHeader title = {title} />);

    const p = container.querySelector('p');

    expect(p).toBeNull();

  });

});