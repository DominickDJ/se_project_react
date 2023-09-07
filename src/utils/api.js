const baseUrl =
  "https://my-json-server.typicode.com/dominickDJ/se_project_react";

export const checkServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function addItems(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function deleteItems(selectedCard) {
  return fetch(`${baseUrl}/items/${selectedCard.id}`, {
    method: "DELETE",
  }).then((res) => {
    return checkServerResponse(res);
  });
}
