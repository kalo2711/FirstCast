import * as SecureStore from 'expo-secure-store'
import { environment } from '../environment'
import {  NAV_AUTHENTICATION, NAV_CONDITIONS_FORM, SECURE_STORE_ITEM_KEY } from '../global-constants'
import { navigate, responseDataHandler } from '../global-functions'
import { loadTranslations } from '../localization'

export async function getAuthToken(navigateIfNotAuth = true) {
  const token = await SecureStore.getItemAsync(SECURE_STORE_ITEM_KEY)
  if (token) {
    return token
  } else {
    if (navigateIfNotAuth) {
        navigate(NAV_AUTHENTICATION)
    }
    return null
  }
}

export async function setAuthToken(token) {
  if (!token) {
    navigate(NAV_AUTHENTICATION)
    return await SecureStore.setItemAsync(SECURE_STORE_ITEM_KEY, '')
  } else {
    return await SecureStore.setItemAsync(SECURE_STORE_ITEM_KEY, token)
  }
}

export async function updateTokenInDatabase(token) {
  const url = environment['host'] + 'api/user/post/updateToken'
  if (token != null) {
    try {
      const userToken = {
        token: token,
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-app-auth': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToken),
      })   
      if (response) {
        navigate(NAV_CONDITIONS_FORM)
      }
    } catch (e) {
      console.log(e)
      setError(loadTranslations("generalUpdateTokenError") + e)
    }
  }
}

export async function checkForValidSub(){
  const token = await getAuthToken();
  const url = environment.authHost + "api/user/subinfo";
  let res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-app-auth': token
    }
  });
  const data = await responseDataHandler(res, false);
  if (data.sub) {
    return data.sub;
  }else {
    return null;
  }
}
