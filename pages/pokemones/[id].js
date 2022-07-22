import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';
import Footer from '../footer';

export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  max-width: 30rem;
  max-height: 35rem;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05),
    0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 1.5rem;
  svg {
    height: 1rem;
  }
  span :hover {
    cursor: pointer !important;
  }
  a:hover {
    color: red;
  }
`;

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log(router);
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
  const type = data.types[0].type.name;
  const weight = data.weight;
  console.log(data);
  return (
    <>
      <Head>
        <title>
          {data.name.replace(/^\w/, (c) => c.toUpperCase())}
        </title>
      </Head>
      <div className="min-h-[80vh]">
        <CardWrapper style={{ backgroundColor: colors[type] }}>
          <h1>
            {data.name.replace(/^\w/, (c) => c.toUpperCase())} -
            Numero: {data.id}
          </h1>
          <Link
            href={`https://pokemon.fandom.com/es/wiki/${data.name}`}
          >
            <div className="has-tooltip bg-slate-300 rounded-lg border-neutral-900 hover:bg-slate-500">
              <Image
                src={data.sprites.front_default}
                alt={data.name}
                width={300}
                height={300}
              />
              <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-1">
                Click me to see more info
              </span>
            </div>
          </Link>
          <p> Type: {type}</p>
          <p> Weight: {weight}</p>
        </CardWrapper>
        <Link href="/">
          <div className="hover:text-orange-600 pt-8 relative">
            <a className="flex flex-row justify-center items-center">
              <MdArrowBack />
              Volver al home
            </a>
          </div>
        </Link>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Pokemon;

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();

  return { props: { data } };
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } },
  ];
  return {
    paths: paths,
    fallback: true,
  };
};

// export const getServerSideProps = async ({ params }) => {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${params.id}`
//   );
//   const data = await response.json();

//   return { props: { data } };
// };
