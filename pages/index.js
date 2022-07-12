import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eee;
  min-height: 100vh;
  color: #333;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 80px;
  li :hover {
    cursor: pointer;
    color: red;
    text-shadow: 2px 2px 5px rgba(206, 89, 55, 0.44);
    transition: all 0.2s ease-in-out;
  }
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  color: red;
`;

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url
    .split('/')
    .filter((x) => x)
    .pop();
  return (
    <div className="pokemon">
      <li>
        <Link href={`/pokemones/${id}`}>{pokemon.name}</Link>
      </li>
    </div>
  );
};

export default function Pokemones({ pokemones }) {
  console.log(pokemones);
  return (
    <Container>
      <Title>Pokemones</Title>
      <Ul>
        {pokemones.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </Ul>
    </Container>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=151`
  );
  const data = await response.json();

  return {
    props: {
      pokemones: data.results,
    },
  };
};
