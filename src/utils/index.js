const truncate = input => {
  if (input.length > 50) return input.substring(0, 50) + '...';
  else return input;
};

const sortBy = (field, reverse, primer) => {
  const key = primer
    ? function(x) {
        return primer(x[field]);
      }
    : function(x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

export { truncate, sortBy };
