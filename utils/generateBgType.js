export default function generateBgType(type) {
  switch (type) {
    case "bug":
      return "#729F3F";
    case "dragon":
      return "#F16E57";
    case "fairy":
      return "#FDB9E9";
    case "fire":
      return "#FD7D24";
    case "ghost":
      return "#7B62A3";
    case "ground":
      return "#AB9842";
    case "normal":
      return "#A4ACAF";
    case "psychic":
      return "#F366B9";
    case "steel":
      return "#9EB7B8";
    case "dark":
      return "#707070";
    case "electric":
      return "#EED535";
    case "fighting":
      return "#D66824";
    case "flying":
      return "#3DC7EF";
    case "grass":
      return "#9BCC50";
    case "ice":
      return "#51C4E7";
    case "poison":
      return "#B97FC9";
    case "rock":
      return "#A38C21";
    case "water":
      return "#4592C4";
    default:
      return "#A4ACAF";
  }
}
