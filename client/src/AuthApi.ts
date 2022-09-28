import { IUser, ILoginUser, ILesson } from "./ApiResponseTypes";

const BASE_URL = 'http://localhost:3001';

export const register = (user :IUser) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const login = (user :ILoginUser) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const profile = async (accessToken : string) => {
  return fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) =>  res.json()
    )
    .catch((err) => console.log(err));
};

export const logout = (tokenName : string) => {
  // delete token from local storage here
  localStorage.removeItem(tokenName);
};

export const addLesson = async (lesson :ILesson, id:string) => {
  return fetch(`${BASE_URL}/addLesson`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ lesson, id }),
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}