import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';

export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 40rem;
  height: 40rem;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05),
    0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
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

const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log(router);
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      <Head>
        <title>
          {data.name.replace(/^\w/, (c) => c.toUpperCase())}
        </title>
      </Head>
      <CardWrapper>
        <h1>
          {data.name.replace(/^\w/, (c) => c.toUpperCase())} - Numero:{' '}
          {data.id}
        </h1>
        <Link
          href={`https://pokemon.fandom.com/es/wiki/${data.name}`}
        >
          <Image
            src={data.sprites.front_default}
            alt={data.name}
            width={300}
            height={300}
          />
        </Link>
        <Link href="/">
          <a>
            <MdArrowBack />
            Volver al home
          </a>
        </Link>
      </CardWrapper>
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
