import React from "react";
import client from "../../configs/apollo-client";
import styled from "@emotion/styled";
import POKEMON_NAME from "../../statics/pokemon-name";
import Image from "next/image";

const Wrapper = styled.div`
  background: url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png);
  min-height: 100vh;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home({ data }) {
  if (!data) return <p>Something went wrong</p>;

  console.log(data);

  return (
    <Wrapper>
      <Column>
        <Image
          alt={`img-${data.pokemon.name}`}
          src={data.pokemon.sprites.front_default}
          width="253"
          height="253"
        />
        {data.pokemon.name}
      </Column>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: POKEMON_NAME,
    variables: { name: context.params.name },
  });

  return {
    props: { data },
  };
}

export default Home;
