import { checkServerResponse, baseUrl } from "./api";

function request(url, options) {
  return fetch(url, options).then(checkServerResponse);
}
export function signUp(name, avatar, email, password) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name, avatar, email, password),
  });
}

export function signIn(email, password) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      return data;
    } else {
      return;
    }
  });
}

export function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function editProfile(token, name, avatar) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}
