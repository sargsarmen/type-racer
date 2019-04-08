export const isAlphaNumeric = keyCode => {
  return (
    (keyCode >= 48 && keyCode <= 90) ||
    (keyCode >= 186 && keyCode <= 192) ||
    (keyCode >= 219 && keyCode <= 222)
  );
};

export const isBackspace = keyCode => {
  return keyCode === 8;
};

export const isSpace = keyCode => {
  return keyCode === 32;
};
