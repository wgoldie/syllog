
export const jsonToBlob = (
  data => `data:text/json;charset=utf-8,\
  ${JSON.stringify(data, null, 2)}`
);
