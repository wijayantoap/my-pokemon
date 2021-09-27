import React from "react";
import client from "../configs/apollo-client";
import POKEMON_LIST from "../statics/pokemon-list";
import PokemonCard from "../components/PokemonCard";
import styled from "@emotion/styled";
import Headroom from "react-headroom";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
  background: url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png);
`;

const HeaderContainer = styled.header`
  background: #313131;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 2;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.input`
  border-color: transparent;
  box-shadow: none;
  width: 300px;
  padding: 8px 4px;
  background: none 0% 0% / auto repeat scroll padding-box border-box
    rgb(255, 255, 255);
`;

const SearchButton = styled.input`
  margin-left: 20px;
`;

const Title = styled.h2`
  text-shadow: 2px 2px blue;
  font-family: "Press Start 2P";
  color: yellow;
  margin-right: 20px;
`;

function Home({ data }) {
  console.log(data.pokemons.nextOffset);
  return (
    <>
      <Headroom>
        <HeaderContainer>
          <Title>Pokémon Search</Title>
          <form>
            <InputContainer>
              <Input type="text" autocomplete="off" spellcheck="false"></Input>
              <SearchButton
                type="submit"
                value="Search"
                id="search"
              ></SearchButton>
            </InputContainer>
          </form>
        </HeaderContainer>
      </Headroom>
      <Container>
        {data.pokemons.results.map((pokemon, index) => (
          <div key={index}>
            <PokemonCard name={pokemon.name} image={pokemon.image} />
          </div>
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: POKEMON_LIST,
  });

  return {
    props: { data },
  };
}

export default Home;
