'use server'
import { cookies } from "next/headers"

export interface CookieData {
    name: string;
    value: string;
    path?: string;
    secure?: boolean;
}


//deleting a cookie
async function deleteCookies(name: string) {
    cookies().delete(name);
}


//setting a cookie
async function setCookie({name, value, path}: CookieData) {
    const cookieStore = cookies();
    console.log(cookieStore);
    cookies().set({
      name: name,
      value: value,
      httpOnly: true,
      path: path,
      secure: true
    })
}

export { setCookie, deleteCookies }