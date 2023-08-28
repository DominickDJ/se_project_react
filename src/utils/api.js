const baseUrl =
  "https://my-json-server.typicode.com/dominickDJ/se_project_react";

const checkServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function getItems(name, link) {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function addItems(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function deleteItems() {
  return fetch(`${baseUrl}/items/:id`, {
    method: "DELETE",
  }).then((res) => {
    return checkServerResponse(res);
  });
}
