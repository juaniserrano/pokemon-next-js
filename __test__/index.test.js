import { render, screen } from '@testing-library/react';
import Index, { getStaticProps } from '../pages/index';

describe('Index', () => {
  describe('Component', () => {
    it('should render correctly', () => {
      render(
        <Index
          pokemones={[
            {
              name: 'Juani',
              url: 'pokemon/1/',
            },
          ]}
        />
      );
      const paragraph = screen.getByTestId('titulo');
      expect(paragraph).toBeInTheDocument();

      const juani = screen.getByText('Juani');
      expect(juani).toBeInTheDocument();

      console.log(juani);

      const url = juani.getAttribute('href');
      expect(url).toEqual('/pokemones/1');
    });

    describe('getStaticProps', () => {
      it('should return the pokemon list', async () => {
        global.fetch = jest.fn().mockImplementation((url) => {
          expect(url).toBe(
            'https://pokeapi.co/api/v2/pokemon?limit=150'
          );
          return new Promise((resolve) => {
            resolve({
              json: () =>
                Promise.resolve({
                  results: 'Pokemon List',
                }),
            });
          });
        });
        const { props } = await getStaticProps();
        expect(props.pokemones).toBe('Pokemon List');
      });
    });
  });
});
