import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eee;
  min-height: 100vh;
  color: #333;
  font-family: sans-serif;
  h2 {
    font-size: 3rem;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 6rem;
  gap: 2rem;
  max-height: 5rem;
  @media only screen and (max-width: 768px) {
    font-size: 4rem;
    flex-direction: column;
    gap: 1rem;
    max-height: unset;
  }
`;

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url
    .split('/')
    .filter((x) => x)
    .pop();
  return (
    <div className="pokemon">
      <li>
        <Link href={`/pokemones/${id}`}>
          {pokemon.name.replace(/^\w/, (c) => c.toUpperCase())}
        </Link>
      </li>
    </div>
  );
};

export default function Pokemones({ pokemones }) {
  return (
    <>
      <Head>
        <title>Pokémon APP</title>
        <meta
          name="description"
          content="This is an app about pokemon made with NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h2>Pokémon App</h2>
        <Title>
          <Image
            src="/pokemonLogo.svg"
            alt="Pokemon"
            width={269}
            height={99}
          />
          +
          <Image
            src="/nextJs.svg"
            alt="Next.js"
            width={150}
            height={150}
          />
        </Title>
        <Ul>
          {pokemones.map((pokemon) => (
            <Pokemon pokemon={pokemon} key={pokemon.name} />
          ))}
        </Ul>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=300`
  );
  const data = await response.json();

  return {
    props: {
      pokemones: data.results,
    },
  };
};
