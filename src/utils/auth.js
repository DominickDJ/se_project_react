import { checkServerResponse, baseUrl } from "./api";

export function signUp(name, avatar, email, password) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return checkServerResponse(res);
  });
}

export function signIn(email, password) {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application:json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkServerResponse(res);
  });
}
