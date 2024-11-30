import Cookies from "universal-cookie";

class CookieManager {
  private cookie: Cookies;

  constructor() {
    this.cookie = new Cookies();
  }

  // Set cookie with token and expiration in seconds
  setCookie(name: string, value: string, expInSec: number) {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expInSec); 

    this.cookie.set(name, value, {
      path: "/",
      maxAge: expInSec
    });
  }

  // Get cookie value by name
  getCookie(name: string): string | undefined {
    return this.cookie.get(name); 
  }

  // Remove cookie by name
  removeCookie(name: string) {
    this.cookie.remove(name, { path: "/" });
  }
}

export const cookieManager = new CookieManager()
