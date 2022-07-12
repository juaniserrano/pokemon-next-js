import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log(router);
  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="pokemon">
      <h1>
        {data.name} numero: {data.id}
      </h1>
      <Image
        src={data.sprites.front_default}
        alt={data.name}
        width={400}
        height={400}
      />
      <Link href="/">Volver al home</Link>
    </div>
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
