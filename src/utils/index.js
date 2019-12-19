const truncate = (input, size) => {
  if (input && input.length > size) return input.substring(0, size) + '...';
  else return input;
};

export { truncate };
