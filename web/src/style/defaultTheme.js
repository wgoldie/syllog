const white = '#fff';
const grey = 'rgba(255, 255, 255, 0.25)';
const grey2 = 'rgba(0, 0, 0, 0.25)';
const black = '#000';

const theme = {
  background: white,
  neutralBackground: grey, // should contrast with background
  hoverBackground: black,
  altBackground: grey2, // should contrast with background and neutralBackground
  altHoverBackground: white,
  border: black,
  borderStyle: 'solid',
  altBorderStyle: 'dotted',
  altBorder: black,
  hoverBorder: white,
  color: black,
  altColor: white,
  hoverColor: white,
  altHoverColor: black,
};

export default theme;
