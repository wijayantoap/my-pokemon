import React, { useState, useEffect } from "react";
import client from "../configs/apollo-client";
import POKEMON_LIST from "../statics/pokemon-list";
import PokemonCard from "../components/PokemonCard";
import styled from "@emotion/styled";
import Headroom from "react-headroom";
import POKEMON_NAME from "../statics/pokemon-name";
import Title from "../components/Title";

const Wrapper = styled.div`
  background: url(https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png);
  min-height: 100vh;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
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
  max-width: 100%;
`;

const Input = styled.input`
  border-color: transparent;
  box-shadow: none;
  width: 260px;
  padding: 8px 4px;
  background: none 0% 0% rgb(255, 255, 255);
`;

const SearchButton = styled.input`
  margin-left: 20px;
`;

const MoreButton = styled.button`
  background-color: #30a7d7;
  border-radius: 4px;
  color: white;
  padding: 20px;
  border: none;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
    background-color: #1b82b1;
  }
`;

function Home({ data }) {
  const [offset, setOffset] = useState(0);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setOffset(data?.pokemons.nextOffset);
    setPokemonsData(data?.pokemons.results);
    setLoading(false);
  }, [data]);

  const getData = async () => {
    setLoadingMore(true);
    const { data } = await client.query({
      query: POKEMON_LIST,
      variables: { offset },
    });

    setOffset(data.pokemons.nextOffset);
    setPokemonsData((prevState) => [...prevState, ...data.pokemons.results]);
    setLoading(false);
    setLoadingMore(false);
  };

  const searchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!searchName) {
      getData();
      return;
    }
    const { data } = await client.query({
      query: POKEMON_NAME,
      variables: { name: searchName },
    });

    setOffset(0);
    if (data.pokemon.id) {
      setPokemonsData([data.pokemon]);
    } else {
      setPokemonsData([]);
    }
    setLoading(false);
  };

  if (!data) return <p>Something went wrong</p>;

  return (
    <Wrapper>
      <Headroom>
        <HeaderContainer>
          <Title title="My Pok??mon" href="/list" />
          <form onSubmit={searchData} style={{ maxWidth: "100%" }}>
            <InputContainer>
              <Input
                type="text"
                name="pokename"
                autoComplete="off"
                placeholder="Search"
                spellCheck="false"
                data-testid="input-pokename"
                onChange={(e) => setSearchName(e.target.value)}
              ></Input>
              <SearchButton
                type="submit"
                value="Search"
                id="search"
              ></SearchButton>
            </InputContainer>
          </form>
        </HeaderContainer>
      </Headroom>
      <CardsContainer>
        {!loading &&
          pokemonsData?.map((pokemon, index) => (
            <div key={index}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.image || pokemon.sprites?.front_default}
              />
            </div>
          ))}
      </CardsContainer>
      {loading && (
        <Column>
          <h3>Loading...</h3>
        </Column>
      )}
      {!loading && pokemonsData.length === 0 && (
        <Column>
          <h1>No Pok??mon match your search</h1>
          <h3>Please search the exact name. eg: 'ditto'</h3>
        </Column>
      )}
      <Column>
        {offset > 0 && !loading && (
          <MoreButton onClick={getData} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </MoreButton>
        )}
      </Column>
    </Wrapper>
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
