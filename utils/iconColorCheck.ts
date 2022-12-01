export default function iconColorCheck(route: string) {
  const white = "hsl(340, 27%, 97%)";
  const black = "hsl(0, 0%, 17%)";

  if (route === "/") {
    return black;
  } else {
    return white;
  }
}
