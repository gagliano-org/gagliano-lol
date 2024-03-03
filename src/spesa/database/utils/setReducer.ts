const pusher = <T>(a: T[], b: T) => {
  a.push(b);
  return a;
};
export const setReducer = <T>(a: T[], c: T) => {
  const condition = a.includes(c);
  if (condition) return a;
  else return pusher(a, c);
};
