const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

export const colorPath = () => {
  const numberOfColors = Math.floor(Math.random() * 2) + 2;
  const colors = Array.from({ length: numberOfColors }, getRandomColor);
  const path = colors.join("-");

  return path;
};
