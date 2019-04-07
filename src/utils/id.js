export default () => {
  return Math.random()
    .toString(36)
    .substr(5, 12);
};
