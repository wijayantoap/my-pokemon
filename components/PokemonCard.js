import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import RadarChart from "./RadarChart";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Card = styled.div`
  margin: 20px;
  box-shadow: 0 0 #f2f2f2;
  transition: 0.5s;
  background-color: white;
  padding: 20px;
  z-index: 1;

  &:hover {
    cursor: pointer;
    box-shadow: -8px 8px #f2f2f2;
    transform: translate(8px, -8px);
  }
`;

const StyledImage = styled(Image)`
  background-color: #f2f2f2;
  border-radius: 4px;
`;

const Name = styled.h3`
  text-transform: capitalize;
`;

const Action = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  color: gray;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.remove ? "#E3350D" : "#9BCC50")};
    color: white;
  }
`;

const PokemonCard = ({ name, image, nickname, data, handleRelease }) => {
  const [owned, setOwned] = useState(0);

  const release = (nickname) => {
    confirmAlert({
      title: "Confirm to release",
      message: "Your Pokémon will miss you :(",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRelease(nickname),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    let pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const totalOwned = pokemons.filter(
      (pokemon) => pokemon.name === name
    ).length;
    setOwned(totalOwned);
  }, []);

  return (
    <Link href={!nickname ? `/details/${name}` : "javascript:void(0);"}>
      <Card>
        <StyledImage alt={`img-${name}`} src={image} width="253" height="253" />
        <Name>{name}</Name>
        {nickname ? <p>{nickname}</p> : <p>Owned: {owned}</p>}
        {nickname && (
          <>
            <RadarChart data={data} />
            <Link href={`/details/${name}`}>
              <Action>Visit</Action>
            </Link>
            <Action remove onClick={() => release(nickname)}>
              Release
            </Action>
          </>
        )}
      </Card>
    </Link>
  );
};

export default memo(PokemonCard);
