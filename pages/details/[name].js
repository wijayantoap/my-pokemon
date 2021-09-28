import React from "react";
import client from "../../configs/apollo-client";
import styled from "@emotion/styled";
import POKEMON_NAME from "../../statics/pokemon-name";
import Image from "next/image";
import generateBgType from "../../utils/generateBgType";
import Head from "next/head";

const Wrapper = styled.div`
  background: url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png);
  min-height: 100vh;
  background-color: ${(props) => props.bg || "gray"};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 430px;
  flex: 1;
  margin: 0 auto;
  background-color: white;
`;

const Types = styled.div`
  background-color: ${(props) => props.bg || "gray"};
  padding: 4px;
  color: white;
  border-radius: 4px;
  text-align: center;
  width: 30%;
`;

const Moves = styled.div`
  background-color: #F2F2F2;
  width: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: 'white
`;

const Capture = styled.div`
  background: #c4cf53;
  color: white;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.h1`
  font-family: "Sigmar One";
`;

function Details({ data }) {
  if (!data) return <p>Something went wrong</p>;

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Wrapper bg={generateBgType(data?.pokemon?.types[0].type.name)}>
        <Column>
          <Image
            alt={`img-${data.pokemon.name}`}
            src={data.pokemon.sprites.front_default}
            width="253"
            height="253"
          />
          <Name>{data.pokemon.name}</Name>
          <Capture>Catch</Capture>
          <p>owned: 0</p>
          <h2>Type</h2>
          <Row>
            {data.pokemon.types.map(({ type }) => (
              <Types bg={generateBgType(type.name)}>{type.name}</Types>
            ))}
          </Row>
          <h2>Moves</h2>
          <Row>
            {data.pokemon.moves.map(({ move }) => (
              <Moves>{move.name}</Moves>
            ))}
          </Row>
        </Column>
      </Wrapper>
    </>
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

export default Details;
