import { checkServerResponse, baseUrl } from "./api";

export function signUp(name, avatar, email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name, avatar, email, password),
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function signIn(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return checkServerResponse(res);
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    });
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // .then((res) => {
  //   return checkServerResponse(res);
  // });
}
