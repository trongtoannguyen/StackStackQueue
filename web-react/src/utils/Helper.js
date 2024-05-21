
// set param url
export function pathParams(data) {
  let params = new URLSearchParams();
  Object.keys(data).forEach(key => {
    data[key] && params.append(key, data[key]);
  })
  return params;
}