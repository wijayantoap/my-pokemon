import React, { useEffect, useState } from "react";
import client from "../../configs/apollo-client";
import styled from "@emotion/styled";
import POKEMON_NAME from "../../statics/pokemon-name";
import Image from "next/image";
import generateBgType from "../../utils/generateBgType";
import Head from "next/head";
import Headroom from "react-headroom";
import Title from "../../components/Title";
import RadarChart from "../../components/RadarChart";

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
  background-color: ${(props) => (props.header ? "#313131" : "transparent")};
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
  background-color: #f2f2f2;
  width: 100%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: gray;
  text-align: center;
`;

const Capture = styled.div`
  background: ${(props) => (props.release ? "#E3350D" : "#c4cf53")};
  color: white;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.h1`
  font-family: "Sigmar One";
`;

function Details({ data }) {
  const [showNickname, setShowNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [lastNickname, setLastNickname] = useState("");
  const [lastData, setLastData] = useState([]);
  const [failed, setFailed] = useState(false);
  const [owned, setOwned] = useState(0);
  const [exists, setExists] = useState(false);
  const [catching, setCatching] = useState(false);

  useEffect(() => {
    let pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const totalOwned = pokemons.filter(
      (pokemon) => pokemon.name === data.pokemon.name
    ).length;
    setOwned(totalOwned);
  }, [data]);

  const catchPokemon = () => {
    if (lastData) {
      setShowNickname(false);
      setLastNickname("");
      setLastData([]);
    }
    if (!showNickname && !catching) {
      setCatching(true);
      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
          setShowNickname(true);
          setFailed(false);
          const data = [];
          for (let i = 0; i < 6; i++) {
            data.push(Math.floor(Math.random() * 99));
          }
          setLastData(data);
        } else {
          setFailed(true);
        }
        setCatching(false);
      }, 1500);
    }
  };

  const saveNickname = (e) => {
    e.preventDefault();
    if (nickname === "") return;

    let pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const poke = {
      name: data.pokemon.name,
      nickname,
      image: data.pokemon.sprites.front_default,
      data: lastData,
    };

    let exists = pokemons.find((o) => o.nickname === nickname);
    if (!exists) {
      pokemons.push(poke);
      setShowNickname(false);
      setLastNickname(nickname);
      setOwned((prevState) => prevState + 1);
      setExists(false);
      setLastData([]);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
    } else {
      setExists(true);
    }
  };

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
        <Headroom>
          <Row header>
            <div>
              <Title title="Home" href="/" />
            </div>
            <div>
              <Title title="List" href="/list" />
            </div>
          </Row>
        </Headroom>
        <Column>
          <Image
            alt={`img-${data.pokemon.name}`}
            src={data.pokemon.sprites.front_default}
            width="253"
            height="253"
          />
          <Name>{data.pokemon.name}</Name>
          <Capture onClick={catchPokemon} release={lastData.length > 0}>
            {catching
              ? "Catching..."
              : lastData.length > 0
              ? "Release"
              : "Catch"}
          </Capture>
          {failed && !catching && <p>Failed to catch!</p>}
          {lastNickname &&
            !failed &&
            !showNickname &&
            !catching &&
            `${lastNickname} saved!`}
          {exists && "Nickname already used!"}
          {showNickname && (
            <form onSubmit={saveNickname}>
              <input
                type="text"
                placeholder="Give a nickname"
                name="pokename"
                autoComplete="off"
                spellCheck="false"
                maxLength="10"
                onChange={(e) => setNickname(e.target.value)}
              />
              <input type="submit" value="Save" id="save" />
            </form>
          )}
          {lastData.length > 0 && <RadarChart data={lastData} />}
          <p>owned: {owned}</p>
          <h2>Type</h2>
          <Row>
            {data.pokemon.types.map(({ type }) => (
              <Types bg={generateBgType(type.name)} key={type.name}>
                {type.name}
              </Types>
            ))}
          </Row>
          <h2>Moves</h2>
          <Row>
            {data.pokemon.moves.map(({ move }) => (
              <Moves key={move.name}>{move.name}</Moves>
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
