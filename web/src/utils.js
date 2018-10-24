export const arrayToObject = (
  (arr) => arr.reduce((acc, [k, v]) => ({...acc, [k]: v }), {})
);
