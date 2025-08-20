export const toLowerCamelCase = (snakeStr: string) => {
  return snakeStr.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
