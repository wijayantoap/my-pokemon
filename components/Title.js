import styled from "@emotion/styled";
import Link from "next/link";

const StyledTitle = styled.h2`
  text-shadow: 2px 2px blue;
  font-family: "Press Start 2P";
  color: yellow;

  &:hover {
    cursor: pointer;
  }
`;

export default function Title({ title, href }) {
  return (
    <Link href={href}>
      <StyledTitle>{title}</StyledTitle>
    </Link>
  );
}
