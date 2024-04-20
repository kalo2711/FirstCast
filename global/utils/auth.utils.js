import * as SecureStore from 'expo-secure-store'
import { environment } from '../environment'
import { JOIN_LOBBY, NAV_AUTHENTICATION, NAV_CONDITIONS_FORM, NAV_GENERAL_PROFILE, NAV_HOME_LIST, NAV_LURES_FORM, SECURE_STORE_ITEM_KEY, SecureStoreItemKey } from '../global-constants'
import { navigate, responseDataHandler } from '../global-functions'
import { loadTranslations } from '../localization'
import { Alert } from "react-native"

export async function getAuthToken(navigateIfNotAuth = true, socketId = null) {
  const token = await SecureStore.getItemAsync(SECURE_STORE_ITEM_KEY)
  if (token) {
    return token
  } else {
    if (navigateIfNotAuth) {
      if (socketId) {
        // navigate(NAV_AUTHENTICATION, {socketId: socketId})
      }
      else {
        // navigate(NAV_AUTHENTICATION)
      }
    }
    return null
  }
}

export async function setAuthToken(token) {
  if (!token) {
    // navigate(NAV_AUTHENTICATION)
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
      await fetch(url, {
        method: 'POST',
        headers: {
          'x-app-auth': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToken),
      })      
      navigate(NAV_CONDITIONS_FORM)
    } catch (e) {
      console.log(e)
      setError(loadTranslations("generalUpdateTokenError") + e)
    }
  }
}
