import React, { useState, useEffect } from "react";
import PokemonCard from "../../components/PokemonCard";
import styled from "@emotion/styled";
import Headroom from "react-headroom";
import Title from "../../components/Title";
import Link from "next/link";

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

function List() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    setPokemonsData(pokemons);
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      <Headroom>
        <HeaderContainer>
          <Link href="/">
            <div>
              <Title title="Home" />
            </div>
          </Link>
        </HeaderContainer>
      </Headroom>
      <CardsContainer>
        {!loading &&
          pokemonsData?.map((pokemon, index) => (
            <div key={index}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.image}
                nickname={pokemon.nickname}
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
          <h1>Try catching your first Pokémon</h1>
        </Column>
      )}
    </Wrapper>
  );
}

export default List;
