import styled from "@emotion/styled";
import Image from "next/image";

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

export default function PokemonCard({ name, image }) {
  return (
    <Card>
      <StyledImage alt={`img-${name}`} src={image} width="253" height="253" />
      <Name>{name}</Name>
      <p>Owned: 0</p>
    </Card>
  );
}
