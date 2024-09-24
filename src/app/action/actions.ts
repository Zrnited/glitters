'use server'
import { cookies } from "next/headers"

export interface CookieData {
    name: string;
    value: string;
    path?: string;
    secure?: boolean;
}

//checking if a cookie exists
async function checkForCookie(){
    const cookieStore = cookies();
    const hasCookies = cookieStore.has('glittersUserToken');
    return hasCookies
}


//deleting a cookie
async function deleteCookies() {
    cookies().delete('glittersUserToken');
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

export { setCookie, deleteCookies, checkForCookie }