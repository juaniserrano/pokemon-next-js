import { render, screen, waitFor } from '@testing-library/react';
import Poke from '../pages/poke';

describe('Poke', () => {
  it('render pokemones', async () => {
    const mockResults = [
      { name: 'Pokemon Juani', url: 'www.test.com/pokemon/detail/1' },
    ];
    global.fetch = jest.fn().mockImplementation((url) => {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              results: mockResults,
            }),
        });
      });
    });

    render(<Poke />);
    const loading = screen.getByText('Cargando...');
    expect(loading).toBeInTheDocument();
    await waitFor(() => screen.getByText('Pokémon App'));
    const element = screen.getByTestId(1);
    const anchor = element.children[0];
    expect(anchor).toHaveAttribute('href', '/pokemones/1');
    expect(anchor).toHaveTextContent('Pokemon Juani');
  });
});
