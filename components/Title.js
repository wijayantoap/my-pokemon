import styled from "@emotion/styled";

const StyledTitle = styled.h2`
  text-shadow: 2px 2px blue;
  font-family: "Press Start 2P";
  color: yellow;

  &:hover {
    cursor: pointer;
  }
`;

export default function Title({ title }) {
  return <StyledTitle>{title}</StyledTitle>;
}
