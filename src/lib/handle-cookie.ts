import Cookies from "js-cookie";

export const setTokenCookie = (token: string, expires: number) => {
  Cookies.set('authToken', token, {expires});
}

export const removeTokenCookie = () => {
  Cookies.remove('authToken');
}

export const accessCookie = () => {
  return Cookies.get('authToken');
}